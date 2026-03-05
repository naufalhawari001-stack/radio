"use client";
import { useAudio } from "@/context/AudioContext";

export default function LivePlayer() {
  const { isPlaying, togglePlay } = useAudio();

  return (
    /**
     * PERBAIKAN TOTAL: 
     * 1. z-[9999] memastikan ini di atas Leaflet/apapun.
     * 2. pointer-events-auto memaksa area ini menerima sentuhan.
     */
    <div className="fixed bottom-0 left-0 right-0 bg-emerald-900/95 backdrop-blur-md text-white shadow-[0_-10px_40px_rgba(0,0,0,0.4)] z-[9999] border-t border-emerald-500/20 pointer-events-auto">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Indikator Status - Radio Suara Al Muttaqin Purwokerto */}
        <div className="flex items-center gap-4">
          <div className="relative flex h-3 w-3">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isPlaying ? 'bg-red-400' : 'bg-transparent'} opacity-75`}></span>
            <span className={`relative inline-flex rounded-full h-3 w-3 ${isPlaying ? 'bg-red-500' : 'bg-gray-600'}`}></span>
          </div>
          <div className="hidden xs:block">
            <p className="text-[11px] font-black tracking-widest uppercase italic leading-none mb-1">Siaran Langsung</p>
            <p className="text-[9px] text-emerald-400 font-mono uppercase tracking-[0.2em]">Suara Al Muttaqin</p>
          </div>
        </div>

        {/* --- TOMBOL KONTROL UTAMA --- 
            Kita beri z-[10000] agar tombol ini adalah elemen paling atas di seluruh web antum.
        */}
        <button 
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log("Tombol disentuh, mengeksekusi togglePlay..."); 
            togglePlay();
          }}
          className="relative z-[10000] flex items-center gap-3 bg-white text-emerald-950 px-8 py-3 rounded-full font-black text-[11px] uppercase tracking-widest hover:bg-emerald-50 transition-all active:scale-90 cursor-pointer shadow-xl select-none"
        >
          {isPlaying ? (
            <>
              <div className="flex gap-1">
                <span className="w-1.5 h-4 bg-emerald-900 rounded-full"></span>
                <span className="w-1.5 h-4 bg-emerald-900 rounded-full"></span>
              </div>
              <span>Berhenti</span>
            </>
          ) : (
            <>
              <div className="w-0 h-0 border-t-[7px] border-t-transparent border-l-[12px] border-l-emerald-950 border-b-[7px] border-b-transparent ml-1"></div>
              <span>Putar Radio</span>
            </>
          )}
        </button>

        {/* Status System (Hanya muncul di Desktop) */}
        <div className="hidden md:block">
          <div className="flex flex-col items-end">
            <span className="text-[9px] font-mono text-emerald-500/60 uppercase tracking-[0.3em]">
              {isPlaying ? "Connection: Active" : "Connection: Standby"}
            </span>
            <span className="text-[8px] text-gray-500 font-bold mt-0.5 uppercase tracking-tighter">
              rsm.my.id v2.0
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}