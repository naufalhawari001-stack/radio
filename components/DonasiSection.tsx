"use client";
import React, { useState } from "react";

export default function DonasiSection() {
  const [copied, setCopied] = useState(false);
  const norek = "1234567890"; // Pastikan ganti ke No. Rekening Yayasan/Pondok

  const handleCopy = () => {
    navigator.clipboard.writeText(norek);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative py-24 px-6 overflow-hidden">
      {/* 1. Background Dinamis */}
      <div className="absolute inset-0 z-0 bg-emerald-950">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500/20 rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-yellow-500/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter">
            Amal <span className="text-yellow-400">Jariyah</span>
          </h2>
          <div className="h-1.5 w-24 bg-yellow-500 mx-auto mt-4 rounded-full shadow-[0_0_15px_rgba(234,179,8,0.5)]"></div>
          
          {/* NARASI BARU: Fokus ke Pondok Pesantren */}
          <p className="mt-8 text-emerald-100/80 max-w-3xl mx-auto text-lg leading-relaxed">
            Dukung perjuangan para pencari ilmu di **Pondok Pesantren Islam Al Muttaqin Jepara**. 
            Setiap bantuan Anda adalah investasi abadi untuk melahirkan generasi Robbani 
            yang teguh iman dan mulia akhlaknya.
          </p>
        </div>

        {/* 2. Grid Kartu Donasi */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* Sisi Kiri: Rekening Pondok */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] shadow-2xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-yellow-500 rounded-2xl flex items-center justify-center text-3xl shadow-lg rotate-3">
                🕌
              </div>
              <div className="text-left">
                <h4 className="text-white font-bold text-xl">Layanan Donasi</h4>
                <p className="text-emerald-400 text-sm font-mono uppercase tracking-widest">Bank Syariah Indonesia (BSI)</p>
              </div>
            </div>

            <div className="bg-black/40 p-6 rounded-2xl border border-emerald-500/20 flex justify-between items-center group">
              <div className="text-left">
                <p className="text-emerald-500 text-[10px] font-black uppercase tracking-widest mb-1">Nomor Rekening</p>
                <p className="text-2xl font-mono text-white font-bold tracking-widest">{norek}</p>
                <p className="text-emerald-100/50 text-xs mt-1 uppercase font-semibold">a.n Ponpes Al Muttaqin Jepara</p>
              </div>
              <button 
                onClick={handleCopy}
                className="bg-emerald-600 hover:bg-emerald-500 text-white p-3 rounded-xl transition-all active:scale-90 shadow-lg"
              >
                {copied ? "✅" : "📋"}
              </button>
            </div>
            
            {copied && <p className="text-yellow-400 text-xs mt-3 animate-bounce text-left">Nomor rekening berhasil disalin!</p>}
          </div>

          {/* Sisi Kanan: Alokasi Donasi Pesantren */}
          <div className="text-left space-y-6 md:pl-8">
            <h4 className="text-white font-bold text-2xl mb-4 italic">Alokasi Infaq:</h4>
            
            <div className="flex gap-4 group">
               <div className="text-yellow-400 text-2xl group-hover:scale-125 transition-transform">⭐</div>
               <p className="text-emerald-50 text-base font-medium">Pemenuhan kebutuhan pokok dan fasilitas asrama santri.</p>
            </div>
            <div className="flex gap-4 group">
               <div className="text-yellow-400 text-2xl group-hover:scale-125 transition-transform">⭐</div>
               <p className="text-emerald-50 text-base font-medium">Pembangunan Sarana Pendidikan & Masjid Pondok.</p>
            </div>
            <div className="flex gap-4 group">
               <div className="text-yellow-400 text-2xl group-hover:scale-125 transition-transform">⭐</div>
               <p className="text-emerald-50 text-base font-medium">Beasiswa bagi Santri Yatim dan Dhuafa berprestasi.</p>
            </div>

            <button className="w-full md:w-auto mt-6 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-emerald-950 px-10 py-4 rounded-2xl font-black text-lg shadow-[0_10px_30px_rgba(234,179,8,0.3)] transition-all transform hover:scale-105 active:scale-95 uppercase tracking-wider">
              Konfirmasi via WhatsApp
            </button>
          </div>

        </div>

        {/* 3. Info Pesantren */}
        <div className="mt-20 p-8 rounded-[2rem] bg-emerald-900/40 border border-emerald-500/10">
          <p className="text-emerald-100/60 text-sm leading-relaxed italic">
            "Apabila manusia mati, maka terputuslah amalnya kecuali tiga perkara: sedekah jariyah, ilmu yang bermanfaat, 
            atau anak sholeh yang mendoakannya." (HR. Muslim)
          </p>
        </div>
      </div>
    </section>
  );
}