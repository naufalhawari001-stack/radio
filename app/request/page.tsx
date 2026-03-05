"use client";

import { useState } from "react";
import { submitRequest } from "./actions";
import Link from "next/link";

export default function PublicRequestPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    setError(null);
    
    try {
      const result = await submitRequest(formData);
      if (result.success) {
        setIsSuccess(true);
      } else {
        setError("Gagal mengirim request. Coba lagi nanti ya.");
      }
    } catch (err) {
      setError("Terjadi kesalahan koneksi ke server.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-emerald-50 flex items-center justify-center p-6 text-center">
        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl max-w-sm border border-emerald-100 animate-in fade-in zoom-in duration-300">
          <div className="text-7xl mb-6">✨</div>
          <h2 className="text-2xl font-black text-emerald-900 uppercase tracking-tight">Jazakallah Khair!</h2>
          <p className="text-emerald-600 mt-3 font-medium">Permintaan antum sudah terkirim ke meja penyiar. Silakan tunggu giliran ya.</p>
          <button 
            onClick={() => setIsSuccess(false)}
            className="mt-8 w-full py-4 bg-emerald-600 text-white rounded-2xl font-black shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all active:scale-95"
          >
            KIRIM REQUEST LAGI
          </button>
          <Link href="/" className="block mt-6 text-xs font-bold text-gray-400 hover:text-emerald-600 uppercase tracking-widest">
            &larr; Kembali ke Beranda
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-emerald-50 py-12 px-4">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-emerald-900 tracking-tighter uppercase italic">Request Siaran 🎙️</h1>
          <p className="text-emerald-600 font-medium mt-1">Nasyid • Murottal • Ceramah</p>
        </div>

        <form action={handleSubmit} className="bg-white p-8 md:p-10 rounded-[3rem] shadow-2xl border border-emerald-100 space-y-6 relative overflow-hidden">
          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-bold border border-red-100 animate-bounce">
              ⚠️ {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-black text-emerald-900 mb-2 uppercase tracking-widest">Nama Lengkap</label>
            <input 
              name="name" 
              required 
              placeholder="Contoh: Akhi Fulan"
              className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 outline-none transition-all font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-black text-emerald-900 mb-2 uppercase tracking-widest">Pilih Kategori</label>
            <div className="relative">
              <select 
                name="category" 
                className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 outline-none transition-all appearance-none font-medium cursor-pointer"
              >
                <option value="Nasyid">🎵 Nasyid</option>
                <option value="Murottal">📖 Murottal (Quran)</option>
                <option value="Ceramah">🎙️ Ceramah / Kajian</option>
              </select>
              <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-emerald-600">▼</div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-black text-emerald-900 mb-2 uppercase tracking-widest">Judul (Nasyid/Surah/Kajian)</label>
            <input 
              name="song_title"  /* DIUBAH: Sesuai dengan kolom di Prisma */
              required 
              placeholder="Judul atau Nama Qori/Ustadz"
              className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 outline-none transition-all font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-black text-emerald-900 mb-2 uppercase tracking-widest">Pesan / Salam (Opsional)</label>
            <textarea 
              name="message" 
              rows={3}
              placeholder="Tuliskan salam atau pesan antum di sini..."
              className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 outline-none transition-all font-medium"
            ></textarea>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full py-5 bg-emerald-600 text-white rounded-[2rem] font-black text-xl hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-200 disabled:bg-gray-300 disabled:shadow-none active:scale-95"
          >
            {isSubmitting ? "MENGIRIM..." : "KIRIM SEKARANG 🚀"}
          </button>
        </form>
      </div>
    </div>
  );
}