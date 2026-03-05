"use client";

import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { updateInfo } from "../../actions";
import { useRouter } from "next/navigation";

export default function EditInfoForm({ info }: { info: any }) {
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState(info.thumbnail || "");
  const router = useRouter();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      if (!e.target.files?.[0]) return;
      const file = e.target.files[0];
      const fileName = `${Math.random()}.${file.name.split('.').pop()}`;
      
      const { error } = await supabase.storage.from('thumbnails').upload(fileName, file);
      if (error) throw error;

      const { data } = supabase.storage.from('thumbnails').getPublicUrl(fileName);
      setImageUrl(data.publicUrl);
    } catch (err) {
      alert("Gagal upload gambar baru!");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const res = await updateInfo(info.id, formData);
    if (res.success) {
      router.push("/admin/info");
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-10 rounded-[3rem] shadow-xl border border-emerald-100 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Judul</label>
            <input name="title" defaultValue={info.title} required className="w-full px-5 py-4 rounded-2xl border bg-gray-50 font-bold outline-none focus:ring-4 focus:ring-emerald-100" />
          </div>
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Kategori</label>
            <select name="category" defaultValue={info.category} className="w-full px-5 py-4 rounded-2xl border bg-gray-50 font-bold outline-none">
              <option value="Berita">📰 Berita Pondok</option>
              <option value="Kajian">🎙️ Artikel Kajian</option>
              <option value="Pengumuman">📢 Pengumuman</option>
            </select>
          </div>
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Ganti Thumbnail</label>
            <input type="file" accept="image/*" onChange={handleUpload} className="w-full text-xs text-gray-400" />
            <input type="hidden" name="thumbnail" value={imageUrl} />
          </div>
        </div>
        <div>
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Isi Berita</label>
          <textarea name="content" defaultValue={info.content} required rows={12} className="w-full px-5 py-4 rounded-2xl border bg-gray-50 font-medium text-sm outline-none focus:ring-4 focus:ring-emerald-100"></textarea>
        </div>
      </div>
      <div className="flex gap-4 pt-6">
        <button type="submit" disabled={uploading} className="flex-1 py-5 bg-emerald-600 text-white rounded-[2rem] font-black text-sm uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100">
          {uploading ? "SABAR, LAGI UPLOAD... ⏳" : "SIMPAN PERUBAHAN 💾"}
        </button>
        <button type="button" onClick={() => router.back()} className="px-8 py-5 bg-gray-100 text-gray-400 rounded-[2rem] font-black text-sm uppercase tracking-widest hover:bg-gray-200">
          BATAL
        </button>
      </div>
    </form>
  );
}