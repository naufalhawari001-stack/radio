"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [saveLoading, setSaveLoading] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-3xl font-black text-emerald-900 tracking-tight uppercase italic">
            Konfigurasi Sistem ⚙️
          </h1>
          <p className="text-emerald-600 font-medium italic">
            Atur parameter teknis Radio Suara Al Muttaqin
          </p>
        </div>

        <div className="grid gap-8">
          {/* SEKSI 1: IDENTITAS RADIO */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-emerald-100 shadow-sm">
            <h2 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6">Identitas Stasiun</h2>
            <div className="grid gap-6">
              <div>
                <label className="block text-[10px] font-black text-emerald-800 uppercase mb-2 ml-1">Nama Stasiun</label>
                <input 
                  type="text" 
                  defaultValue="Radio Suara Al Muttaqin"
                  className="w-full bg-emerald-50 border-none rounded-2xl px-5 py-4 text-sm font-bold text-emerald-900 focus:ring-2 focus:ring-emerald-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-emerald-800 uppercase mb-2 ml-1">Tagline Inspiratif</label>
                <input 
                  type="text" 
                  defaultValue="Menginspirasi Hati, Menguatkan Iman"
                  className="w-full bg-emerald-50 border-none rounded-2xl px-5 py-4 text-sm font-bold text-emerald-900 focus:ring-2 focus:ring-emerald-500 transition-all"
                />
              </div>
            </div>
          </div>

          {/* SEKSI 2: KONEKSI AZURACAST */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-emerald-100 shadow-sm">
            <h2 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6">Integrasi API AzuraCast</h2>
            <div className="grid gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black text-emerald-800 uppercase mb-2 ml-1">Station ID / Shortcode</label>
                  <input 
                    type="text" 
                    defaultValue="salaam"
                    disabled
                    className="w-full bg-gray-100 border-none rounded-2xl px-5 py-4 text-sm font-bold text-gray-400 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-emerald-800 uppercase mb-2 ml-1">Refresh Rate (Detik)</label>
                  <input 
                    type="number" 
                    defaultValue="15"
                    className="w-full bg-emerald-50 border-none rounded-2xl px-5 py-4 text-sm font-bold text-emerald-900 focus:ring-2 focus:ring-emerald-500 transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-black text-emerald-800 uppercase mb-2 ml-1">AzuraCast API Key</label>
                <input 
                  type="password" 
                  placeholder="••••••••••••••••••••••••••••"
                  className="w-full bg-emerald-50 border-none rounded-2xl px-5 py-4 text-sm font-bold text-emerald-900 focus:ring-2 focus:ring-emerald-500 transition-all"
                />
              </div>
            </div>
          </div>

          {/* TOMBOL SIMPAN */}
          <div className="flex justify-end pt-4">
            <button 
              onClick={() => {
                setSaveLoading(true);
                setTimeout(() => setSaveLoading(false), 2000);
              }}
              className="px-10 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-2xl shadow-lg shadow-emerald-200 transition-all active:scale-95 uppercase tracking-widest text-xs"
            >
              {saveLoading ? "Menyimpan..." : "Simpan Perubahan ✅"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}