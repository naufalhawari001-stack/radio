"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createClient } from "@supabase/supabase-js";

// Inisialisasi Supabase Admin untuk manajemen file di Storage
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Gunakan Service Role Key agar bisa hapus file
);

/**
 * Fungsi untuk menambah berita baru
 * Otomatis mengatur status 'published' agar langsung muncul di homepage.
 */
export async function addInfo(formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const category = formData.get("category") as string;
  const thumbnail = formData.get("thumbnail") as string;
  
  // AMBIL STATUS DARI FORM: Default ke 'published' agar tidak repot buka Supabase
  const status = (formData.get("status") as string) || "published";

  const slug = title
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-') + "-" + Math.random().toString(36).substring(7);

  try {
    await prisma.info.create({
      data: { 
        title, 
        slug, 
        content, 
        category, 
        thumbnail,
        status, // 'published' atau 'draft'
        is_active: true, // Wajib TRUE agar muncul di InfoSection
        excerpt: content.replace(/<[^>]*>?/gm, '').substring(0, 150) + "..." 
      }
    });

    // Revalidate semua path agar konten segar
    revalidatePath("/admin/info");
    revalidatePath("/info");
    revalidatePath("/");
    
    return { success: true };
  } catch (error) {
    console.error("Gagal menambah berita:", error);
    return { success: false, error: "Gagal menyimpan berita." };
  }
}

/**
 * Fungsi Update berita lama
 * Menangani perubahan status dan pembersihan file lama.
 */
export async function updateInfo(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const category = formData.get("category") as string;
  const thumbnail = formData.get("thumbnail") as string;
  const status = (formData.get("status") as string) || "published";

  const slug = title
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');

  try {
    const oldInfo = await prisma.info.findUnique({
      where: { id },
      select: { thumbnail: true }
    });

    // Hapus file lama jika antum upload thumbnail baru
    if (thumbnail && oldInfo?.thumbnail && thumbnail !== oldInfo.thumbnail) {
      const oldFileName = oldInfo.thumbnail.split('/').pop();
      if (oldFileName) {
        await supabaseAdmin.storage.from('thumbnails').remove([oldFileName]);
      }
    }

    await prisma.info.update({
      where: { id },
      data: {
        title,
        slug,
        content,
        category,
        status, // Update status terbaru
        thumbnail: thumbnail || oldInfo?.thumbnail,
        excerpt: content.replace(/<[^>]*>?/gm, '').substring(0, 150) + "..."
      }
    });

    revalidatePath("/admin/info");
    revalidatePath("/info");
    revalidatePath("/");
    
    return { success: true };
  } catch (error) {
    console.error("Gagal update berita:", error);
    return { success: false, error: "Gagal memperbarui informasi." };
  }
}

/**
 * Fungsi hapus berita beserta file fisiknya
 */
export async function deleteInfo(id: string) {
  try {
    const info = await prisma.info.findUnique({
      where: { id },
      select: { thumbnail: true }
    });

    if (info?.thumbnail) {
      const fileName = info.thumbnail.split('/').pop();
      if (fileName) {
        await supabaseAdmin.storage.from('thumbnails').remove([fileName]);
      }
    }

    await prisma.info.delete({
      where: { id }
    });

    revalidatePath("/admin/info");
    revalidatePath("/info");
    revalidatePath("/");
    
    return { success: true };
  } catch (error) {
    console.error("Gagal menghapus berita:", error);
    return { success: false, error: "Gagal menghapus data dan file." };
  }
}