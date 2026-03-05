"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

/**
 * Fungsi untuk menambah berita baru (Murni Prisma)
 */
export async function addInfo(formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const category = formData.get("category") as string;
  const thumbnail = formData.get("thumbnail") as string; // Sekarang simpan URL string saja
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
        status,
        is_active: true,
        excerpt: content.replace(/<[^>]*>?/gm, '').substring(0, 150) + "..." 
      }
    });

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
 * Fungsi Update berita (Tanpa Hapus File Supabase)
 */
export async function updateInfo(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const category = formData.get("category") as string;
  const thumbnail = formData.get("thumbnail") as string;
  const status = (formData.get("status") as string) || "published";

  const slug = title.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-');

  try {
    await prisma.info.update({
      where: { id },
      data: {
        title,
        slug,
        content,
        category,
        status,
        thumbnail,
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
 * Fungsi hapus berita (Murni Database)
 */
export async function deleteInfo(id: string) {
  try {
    await prisma.info.delete({
      where: { id }
    });

    revalidatePath("/admin/info");
    revalidatePath("/info");
    revalidatePath("/");
    
    return { success: true };
  } catch (error) {
    console.error("Gagal menghapus berita:", error);
    return { success: false, error: "Gagal menghapus data." };
  }
}