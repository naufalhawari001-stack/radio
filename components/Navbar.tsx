"use client";
import Link from "next/link"

export default function Navbar() {
  return (
    // bg-white/70 memberikan warna putih transparan
    // backdrop-blur-md menciptakan efek "kaca kamar mandi"
    <header className="sticky top-0 z-50 w-full bg-white/70 backdrop-blur-md border-b border-slate-200/50 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo & Branding */}
        <div className="flex flex-col">
          <Link href="/" className="group flex items-center gap-2">
            <span className="text-2xl group-hover:rotate-12 transition-transform duration-300">🎙️</span>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Radio Suara Al Muttaqin
            </h1>
          </Link>
          <p className="text-[10px] text-emerald-600 font-mono uppercase tracking-[0.2em] ml-9">
            Menginspirasi hati, menguatkan iman
          </p>
        </div>

        {/* Navigasi Desktop */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold">
          {[
            { name: "Beranda", path: "/" },
            { name: "Jadwal", path: "/jadwal" },
            { name: "Request Lagu", path: "/request" },
            { name: "Komunitas", path: "/komunitas" },
          ].map((item) => (
            <Link 
              key={item.name}
              href={item.path} 
              // Menggunakan text-slate-600 agar kontras di atas background putih
              className="text-slate-600 hover:text-emerald-600 transition-colors relative group"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
          
          {/* Tombol Donasi tetap menonjol dengan warna Emerald */}
          <Link 
            href="/donasi" 
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-xl transition-all shadow-md active:scale-95"
          >
            Donasi
          </Link>
        </nav>
      </div>
    </header>
  )
}