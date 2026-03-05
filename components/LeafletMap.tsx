"use client";

import { useEffect, useRef, useState } from "react";
import L from "leaflet";

export default function LeafletMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // 1. Pastikan browser sudah siap sepenuhnya
    const initMap = async () => {
      if (!mapRef.current || mapInstance.current) return;

      // Fix Icon Ikon Pecah
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      // 2. Inisialisasi Instance Peta
      mapInstance.current = L.map(mapRef.current, {
        scrollWheelZoom: false,
        fadeAnimation: true,
      }).setView([-7.0, 110.0], 2);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; OpenStreetMap',
      }).addTo(mapInstance.current);

      // 3. Paksa Invalidate Size berkala sampai muncul
      for (let i = 1; i <= 3; i++) {
        setTimeout(() => {
          mapInstance.current?.invalidateSize();
        }, i * 500);
      }

      // 4. Tarik Data Pendengar Salaam
      try {
        const res = await fetch("/api/listeners");
        const data = await res.json();
        const bounds = L.latLngBounds([]);
        let hasPoints = false;

        data.forEach((l: any) => {
          if (l.location.lat && l.location.lon && l.location.lat !== 0) {
            L.marker([l.location.lat, l.location.lon])
              .addTo(mapInstance.current!)
              .bindPopup(`<b>${l.location.city || 'Pendengar'}</b>`);
            bounds.extend([l.location.lat, l.location.lon]);
            hasPoints = true;
          }
        });

        if (hasPoints) {
          mapInstance.current.fitBounds(bounds, { padding: [50, 50], maxZoom: 10 });
        }
      } catch (e) {
        console.error("Fetch Error:", e);
      }
    };

    // Delay kecil sebelum eksekusi agar DOM benar-benar stabil
    const timer = setTimeout(() => {
      setIsReady(true);
      initMap();
    }, 500);

    return () => {
      clearTimeout(timer);
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  return (
    <>
      {/* PAKSA LOAD CSS LEAFLET DI SINI */}
      <link 
        rel="stylesheet" 
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" 
      />
      <style jsx global>{`
        .leaflet-container {
          width: 100%;
          height: 100%;
          background: #f8fafc !important;
          z-index: 1;
        }
      `}</style>
      
      <div 
        ref={mapRef} 
        className="w-full h-full rounded-3xl" 
        style={{ minHeight: '400px' }}
      >
        {!isReady && (
          <div className="flex items-center justify-center h-full bg-gray-50 animate-pulse rounded-3xl">
            <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">
              Menghubungkan Radar...
            </span>
          </div>
        )}
      </div>
    </>
  );
}