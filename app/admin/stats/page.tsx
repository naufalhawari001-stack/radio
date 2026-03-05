import Link from "next/link";

export default async function StatsPage() {
  // 1. Fetch data real-time dari AzuraCast rsm.my.id
  let radioData = null;
  try {
    const res = await fetch("https://rsm.my.id/api/nowplaying/salaam", { 
      next: { revalidate: 30 } // Refresh otomatis tiap 30 detik
    });
    radioData = await res.json();
  } catch (error) {
    console.error("Gagal ganking data AzuraCast:", error);
  }

  const listeners = radioData?.listeners || { total: 0, unique: 0 };
  const nowPlaying = radioData?.now_playing?.song?.text || "Tidak ada lagu";

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        {/* Header Statistik */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-black text-emerald-900 tracking-tight uppercase italic">
              Analisis Statistik 📊
            </h1>
            <p className="text-emerald-600 mt-1 font-medium italic">
              Memantau jangkauan dakwah Radio Suara Al Muttaqin.
            </p>
          </div>
          <Link 
            href="/admin" 
            className="px-6 py-3 bg-white border border-emerald-200 rounded-2xl text-emerald-700 font-black hover:bg-emerald-50 transition-all text-xs uppercase tracking-widest"
          >
            &larr; Kembali ke Dashboard
          </Link>
        </div>

        {/* Live Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Total Pendengar saat ini */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-emerald-100">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Total Pendengar Aktif</p>
            <div className="flex items-end gap-3">
              <span className="text-6xl font-black text-emerald-950 leading-none">{listeners.total}</span>
              <span className="text-emerald-500 font-bold animate-pulse mb-1 text-sm">● LIVE</span>
            </div>
          </div>

          {/* Pendengar Unik */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-emerald-100">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Pendengar Unik</p>
            <span className="text-6xl font-black text-blue-900 leading-none">{listeners.unique}</span>
          </div>

          {/* Mount Point Info */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-emerald-100">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Mount Point Aktif</p>
            <span className="text-2xl font-black text-purple-900 uppercase italic">/salaam</span>
            <p className="text-xs text-gray-400 mt-2 font-bold tracking-tighter">Icecast 2.4 / Liquidsoap</p>
          </div>
        </div>

        {/* Live Song & Status Card */}
        <div className="bg-emerald-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-[10px] font-black text-emerald-300 uppercase tracking-[0.3em] mb-4">Sedang Diputar Sekarang</p>
            <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter mb-6 uppercase">
              {nowPlaying}
            </h2>
            <div className="inline-flex items-center gap-4 px-6 py-3 bg-emerald-800/50 rounded-2xl border border-emerald-700">
              <span className="w-3 h-3 bg-emerald-400 rounded-full animate-ping"></span>
              <span className="text-xs font-black uppercase tracking-widest">Streaming Server Online</span>
            </div>
          </div>
          {/* Dekorasi Background */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-800 rounded-full -mr-32 -mt-32 opacity-50 blur-3xl"></div>
        </div>

        {/* Footer Info */}
        <div className="mt-20 py-8 border-t border-gray-100 text-center">
          <p className="text-gray-300 text-[10px] font-black uppercase tracking-[0.5em]">
            Data Source: AzuraCast API (rsm.my.id)
          </p>
        </div>
      </div>
    </div>
  );
}