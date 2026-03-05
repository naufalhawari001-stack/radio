import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

// Next.js 15+ mewajibkan params di-await karena tipenya sekarang adalah Promise
export default async function InfoDetailPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  // 1. Await params terlebih dahulu untuk mendapatkan slug
  const { slug } = await params;

  // 2. Mencari berita berdasarkan slug yang unik
  const info = await prisma.info.findUnique({
    where: { slug: slug },
  });

  // 3. Jika data tidak ditemukan, lempar ke halaman 404
  if (!info) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <article className="max-w-3xl mx-auto bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Gambar Utama (Slim & Sharp) */}
        {info.thumbnail && (
          <div className="w-full h-72 relative">
            <img 
              src={info.thumbnail} 
              alt={info.title} 
              className="w-full h-full object-cover" 
            />
          </div>
        )}

        <div className="p-8 md:p-12">
          {/* Metadata */}
          <div className="flex items-center gap-4 mb-6">
            <span className="px-4 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg text-[10px] font-black uppercase tracking-widest">
              {info.category}
            </span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              {new Date(info.created_at).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </span>
          </div>

          {/* Judul Artikel */}
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-8 uppercase italic tracking-tighter leading-none">
            {info.title}
          </h1>

          {/* Isi Artikel - Merender HTML dari RichTextEditor */}
          <div 
            className="prose prose-emerald max-w-none text-gray-600 leading-relaxed font-medium"
            dangerouslySetInnerHTML={{ __html: info.content }}
          />
        </div>
      </article>

      {/* Footer Navigasi */}
      <div className="max-w-3xl mx-auto mt-12 text-center">
        <a 
          href="/info" 
          className="text-emerald-600 font-black text-[10px] uppercase tracking-widest hover:underline"
        >
          ← Kembali ke Warta Pondok
        </a>
      </div>
    </div>
  );
}