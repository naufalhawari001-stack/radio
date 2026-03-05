"use client";
import Link from "next/link";

export default function KomunitasPage() {
  const socialMedia = [
    { 
      name: "Telegram Audio", 
      desc: "Kumpulan rekaman murottal dan kajian eksklusif harian.", 
      icon: "✈️", 
      color: "bg-sky-500",
      link: "#" 
    },
    { 
      name: "WhatsApp Grup", 
      desc: "Diskusi hangat seputar parenting dan adab harian santri.", 
      icon: "💬", 
      color: "bg-emerald-500",
      link: "#" 
    },
    { 
      name: "YouTube Channel", 
      desc: "Live streaming kajian rutin Ust. Sartono dan ustadz pondok.", 
      icon: "🎬", 
      color: "bg-red-500",
      link: "#" 
    },
  ];

  return (
    <div className="min-h-screen bg-emerald-950 pt-32 pb-20 px-6 relative overflow-hidden">
      {/* Efek Latar Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] -mr-48 -mt-48"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter italic italic">
            Ruang <span className="text-cyan-400">Komunitas</span>
          </h1>
          <div className="h-1.5 w-32 bg-gradient-to-r from-cyan-400 to-emerald-400 mx-auto mt-6 rounded-full shadow-[0_0_20px_rgba(34,211,238,0.5)]" />
          <p className="mt-8 text-emerald-100/70 max-w-2xl mx-auto text-lg">
            Bergabunglah dalam jaringan ukhuwah digital Pondok Pesantren Islam Al Muttaqin. 
            Bersama kita belajar, berbagi, dan menguatkan iman.
          </p>
        </div>

        {/* Grid Kartu Komunitas */}
        <div className="grid md:grid-cols-3 gap-8">
          {socialMedia.map((social, index) => (
            <div 
              key={index}
              className="group relative bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 shadow-2xl"
            >
              <div className={`w-16 h-16 ${social.color} rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-lg rotate-3 group-hover:rotate-12 transition-transform`}>
                {social.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">{social.name}</h3>
              <p className="text-emerald-100/60 text-sm leading-relaxed mb-8">
                {social.desc}
              </p>
              <Link 
                href={social.link}
                className="inline-flex items-center gap-2 text-cyan-400 font-bold uppercase text-xs tracking-widest hover:text-white transition-colors"
              >
                Gabung Sekarang <span>→</span>
              </Link>
            </div>
          ))}
        </div>

        {/* Mitra Media Section - OnIslam */}
        <div className="mt-20">
          <div className="bg-gradient-to-r from-emerald-900/40 to-cyan-900/40 backdrop-blur-md border border-white/5 p-10 rounded-[3rem] flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="text-left space-y-4">
              <span className="bg-emerald-500 text-emerald-950 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                Mitra Media Islam
              </span>
              <h2 className="text-3xl font-bold text-white">OnIslam.web.id</h2>
              <p className="text-emerald-100/60 max-w-md">
                Dapatkan update berita pilihan, artikel pendidikan, dan khazanah keislaman 
                melalui portal media mitra kami.
              </p>
            </div>
            <Link 
              href="https://onislam.web.id" 
              target="_blank"
              className="bg-white text-emerald-950 px-10 py-4 rounded-2xl font-black hover:bg-cyan-400 hover:text-emerald-950 transition-all shadow-xl whitespace-nowrap"
            >
              Kunjungi OnIslam
            </Link>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-20 text-center opacity-30">
          <p className="text-[10px] font-mono text-emerald-100 uppercase tracking-[0.5em]">
            Al Muttaqin Community Framework v1.0 • Jepara, Central Java
          </p>
        </div>
      </div>
    </div>
  );
}