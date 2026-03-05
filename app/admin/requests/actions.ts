"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

/**
 * Fungsi untuk menandai request sudah diputar.
 * Mengubah status dari 'pending' menjadi 'completed'.
 */
export async function approveRequest(id: string) {
  try {
    // PERBAIKAN: Gunakan songRequest (camelCase) sesuai schema.prisma
    await prisma.songRequest.update({
      where: { id },
      data: { status: "completed" },
    });

    /** * Melakukan revalidasi path agar:
     * 1. Angka 'Request Pending' di Dashboard Utama berkurang
     * 2. Status di tabel admin berubah menjadi COMPLETED
     */
    revalidatePath("/admin");
    revalidatePath("/admin/requests");
    
    return { success: true };
  } catch (error) {
    console.error("Gagal update request:", error);
    return { success: false };
  }
}

/**
 * Fungsi untuk menghapus request dari database.
 */
export async function deleteRequest(id: string) {
  try {
    // PERBAIKAN: Gunakan songRequest (camelCase) sesuai schema.prisma
    await prisma.songRequest.delete({
      where: { id },
    });

    // Revalidasi agar angka 'Total Request' di dashboard ikut terupdate
    revalidatePath("/admin");
    revalidatePath("/admin/requests");
    
    return { success: true };
  } catch (error) {
    console.error("Gagal hapus request:", error);
    return { success: false };
  }
}