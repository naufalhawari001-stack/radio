"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function submitRequest(formData: FormData) {
  // Ambil data dari form
  const name = formData.get("name") as string;
  const category = formData.get("category") as string;
  const song_title = formData.get("song_title") as string; // PERBAIKAN: Harus 'song_title' agar sinkron dengan form
  const messageInput = formData.get("message") as string;

  // Standarisasi agar Admin mudah membaca di dashboard
  const fullTitle = `[${category}] ${song_title}`;

  try {
    // PERBAIKAN: Gunakan 'songRequest' (camelCase) sesuai Model SongRequest di schema.prisma
    await prisma.songRequest.create({
      data: {
        name: name,
        song_title: fullTitle,
        message: messageInput || "-",
        status: "pending", // Default status agar muncul di 'Request Pending' dashboard
      },
    });

    /**
     * Revalidasi Path
     * '/admin' untuk mengupdate angka statistik di dashboard utama
     * '/admin/requests' untuk mengupdate daftar tabel request
     */
    revalidatePath("/admin"); 
    revalidatePath("/admin/requests");
    
    return { success: true };
  } catch (error) {
    console.error("Gagal mengirim request ke Supabase:", error);
    return { success: false, error: "Terjadi kesalahan sistem. Coba lagi ya!" };
  }
}