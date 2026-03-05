"use client"; // Wajib agar bisa pakai onClick & confirm

import { deleteRequest } from "./actions";

export default function DeleteButton({ id }: { id: string }) {
  const handleDelete = async () => {
    if (confirm("Yakin mau hapus request ini, Aris?")) {
      await deleteRequest(id);
    }
  };

  return (
    <button 
      onClick={handleDelete}
      className="px-4 py-2 bg-red-50 text-red-500 rounded-xl text-[10px] font-black uppercase hover:bg-red-500 hover:text-white transition-all active:scale-95"
    >
      🗑️ Hapus
    </button>
  );
}