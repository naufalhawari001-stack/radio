"use client";
import { useEffect, useState } from "react";

export default function ScheduleSection() {
  const [currentPlaylist, setCurrentPlaylist] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const API_URL = "https://rsm.my.id/api/nowplaying/1";
  const API_KEY = "9a155edf8534f670:93599d57dd1e78c87b6adea7b6f73749"; //

  useEffect(() => {
    const syncWithAzura = async () => {
      try {
        const response = await fetch(API_URL, {
          method: 'GET',
          headers: {
            'X-API-Key': API_KEY, //
            'Content-Type': 'application/json',
          },
          cache: 'no-store'
        });
        const data = await response.json();
        const playlistName = data[0]?.now_playing?.playlist || ""; //
        setCurrentPlaylist(playlistName);
      } catch (error) {
        console.error("Gagal sinkron AzuraCast:", error);
      } finally {
        setLoading(false);
      }
    };

    syncWithAzura();
    const interval = setInterval(syncWithAzura, 30000); 
    return () => clearInterval(interval);
  }, []);

  const scheduleData = [
    { time: "06:00 - 07:00", title: "Nasyid Pagi", icon: "☀️" },
    { time: "07:00 - 09:00", title: "Taujih Pagi Ust. Sartono", icon: "📖" },
    { time: "10:00 - 11:00", title: "Kajian Keluarga Sakinah", icon: "🏠" },
    { time: "13:00 - 14:00", title: "Kajian Tematik", icon: "💡" },
    { time: "16:00 - 17:00", title: "Taujih Sore Ust. Sartono", icon: "🌇" },
    { time: "17:00 - 19:30", title: "Murottal Anak", icon: "🌙" },
    { time: "19:30 - 21:00", title: "Tazkiyatun Nafs", icon: "💎" },
    { time: "21:00 - 22:00", title: "Kajian Parenting", icon: "👨‍👩‍👧" },
    { time: "22:00 - 23:00", title: "Nasyid Lawas", icon: "🎵" },
  ]; //

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Efek Latar Belakang Digital */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-emerald-950 uppercase italic tracking-tighter drop-shadow-sm">
            Jadwal Siaran <span className="text-emerald-500">Pilihan</span>
          </h2>
          <div className="h-1.5 w-32 bg-gradient-to-r from-emerald-400 to-cyan-400 mx-auto mt-4 rounded-full shadow-lg" />
          <p className="mt-6 text-slate-500 font-medium max-w-lg mx-auto leading-relaxed">
            Pantau siaran favoritmu agar tidak ketinggalan momen menginspirasi hati.
          </p>
        </div>

        <div className="grid gap-6">
          {scheduleData.map((prog, index) => {
            const isLive = currentPlaylist.toLowerCase().includes(prog.title.toLowerCase());

            return (
              <div 
                key={index}
                className={`group relative overflow-hidden rounded-[2rem] transition-all duration-700 p-1 ${
                  isLive ? "bg-gradient-to-r from-emerald-500 via-cyan-400 to-emerald-500 animate-gradient-x p-[3px] shadow-2xl scale-[1.03] z-20" : "bg-white shadow-md hover:shadow-xl hover:-translate-y-1"
                }`}
              >
                <div className={`relative flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 md:p-8 rounded-[1.8rem] transition-all ${
                  isLive ? "bg-white/95 backdrop-blur-sm" : "bg-white"
                }`}>
                  
                  {/* Bagian Kiri: Jam & Icon */}
                  <div className="flex items-center gap-6">
                    <div className={`flex flex-col items-center justify-center w-20 h-20 rounded-2xl border-2 transition-all duration-500 ${
                      isLive ? "bg-emerald-600 border-emerald-400 text-white shadow-lg rotate-3" : "bg-slate-50 border-slate-100 text-slate-400 group-hover:bg-emerald-50 group-hover:border-emerald-100"
                    }`}>
                      <span className="text-2xl mb-1">{prog.icon}</span>
                      <span className="text-[10px] font-black uppercase tracking-tighter">Start</span>
                    </div>

                    <div className="space-y-1">
                      <span className={`text-xs font-bold tracking-[0.2em] uppercase ${isLive ? "text-emerald-600" : "text-slate-400"}`}>
                        {prog.time}
                      </span>
                      <h3 className={`text-2xl font-black tracking-tight transition-colors ${
                        isLive ? "text-emerald-950" : "text-slate-700 group-hover:text-emerald-800"
                      }`}>
                        {prog.title}
                      </h3>
                    </div>
                  </div>

                  {/* Bagian Kanan: Status Live ala Cyber-Neon */}
                  {isLive ? (
                    <div className="flex items-center gap-4 bg-emerald-50 px-6 py-3 rounded-2xl border border-emerald-100">
                      <div className="flex flex-col items-end">
                        <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest animate-pulse">Scanning Signal...</span>
                        <span className="text-sm font-bold text-emerald-900 uppercase italic">On Air Now</span>
                      </div>
                      <div className="relative flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.5)]"></span>
                      </div>
                    </div>
                  ) : (
                    <div className="hidden md:block opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
                      <span className="text-[10px] font-mono text-slate-300 uppercase tracking-[0.5em]">Standby Frequency</span>
                    </div>
                  )}

                  {/* Efek Glitch Garis Halus untuk Live Item */}
                  {isLive && (
                    <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-emerald-500/5 to-transparent pointer-events-none"></div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block p-1 rounded-full bg-slate-100">
            <div className="bg-white px-8 py-3 rounded-full border border-slate-200 shadow-sm">
              <p className="text-xs font-mono text-slate-400 uppercase tracking-[0.3em]">
                System Synchronized with <span className="text-emerald-500 font-bold underline decoration-emerald-200 decoration-2 underline-offset-4">rsm.my.id/api</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}