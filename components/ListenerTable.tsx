"use client";

import { useEffect, useState } from "react";

export default function ListenerTable() {
  const [listeners, setListeners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTableData = async () => {
    try {
      const res = await fetch("/api/listeners");
      if (!res.ok) throw new Error("Gagal ambil data");
      const data = await res.json();
      setListeners(data);
    } catch (error) {
      console.error("Table Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTableData();
    const interval = setInterval(fetchTableData, 30000); // Sinkron tiap 30 detik
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div className="p-10 text-center animate-pulse text-emerald-300 font-bold uppercase text-[10px] tracking-widest">Memuat Rincian...</div>;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-emerald-50 text-[10px] font-black text-emerald-800 uppercase tracking-widest">
            <th className="py-4 px-4">Lokasi / Kota</th>
            <th className="py-4 px-4">Koordinat</th>
            <th className="py-4 px-4">Perangkat (Client)</th>
            <th className="py-4 px-4 text-right">Status</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 font-medium text-sm">
          {listeners.length === 0 ? (
            <tr>
              <td colSpan={4} className="py-10 text-center text-gray-400 italic">Belum ada pendengar aktif yang terdeteksi.</td>
            </tr>
          ) : (
            listeners.map((l, index) => (
              <tr key={index} className="border-b border-gray-50 hover:bg-emerald-50 transition-colors">
                <td className="py-4 px-4">
                  <div className="flex flex-col">
                    <span className="text-gray-900 font-black uppercase">
                      {l.location.city || "Unknown"}, {l.location.country || "ID"}
                    </span>
                    <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-tighter">
                      {l.location.region || "Global Access"}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-4 text-xs font-mono text-gray-400">
                  {l.location.lat.toFixed(4)}, {l.location.lon.toFixed(4)}
                </td>
                <td className="py-4 px-4">
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-[10px] font-bold border border-gray-200">
                    {l.device.client || "Web Player"}
                  </span>
                </td>
                <td className="py-4 px-4 text-right">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[9px] font-black uppercase">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                    Mendengarkan
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}