import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-400 pt-20 pb-10 border-t border-emerald-900/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Kolom 1: Branding & Misi */}
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🎙️</span>
              <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic">
                Radio Suara <span className="text-emerald-500">Al Muttaqin</span>
              </h3>
            </div>
            <p className="text-sm leading-relaxed max-w-sm">
              Media dakwah resmi **Pondok Pesantren Islam Al Muttaqin Jepara**. 
              Menyebarkan cahaya ilmu, murottal Al-Qur'an, dan kajian keislaman 
              untuk menginspirasi hati serta menguatkan iman umat.
            </p>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-emerald-600 transition-colors cursor-pointer">FB</div>
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-emerald-600 transition-colors cursor-pointer">IG</div>
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-emerald-600 transition-colors cursor-pointer">YT</div>
            </div>
          </div>

          {/* Kolom 2: Navigasi Cepat */}
          <div className="space-y-6">
            <h4 className="text-white font-bold uppercase tracking-widest text-xs">Navigasi</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="/" className="hover:text-emerald-400 transition-colors">Beranda</Link></li>
              <li><Link href="/jadwal" className="hover:text-emerald-400 transition-colors">Jadwal Siaran</Link></li>
              <li><Link href="/request" className="hover:text-emerald-400 transition-colors">Request Lagu</Link></li>
              <li><Link href="/donasi" className="hover:text-emerald-400 transition-colors">Infaq Pesantren</Link></li>
            </ul>
          </div>

          {/* Kolom 3: Jaringan Media (OnIslam) */}
          <div className="space-y-6">
            <h4 className="text-white font-bold uppercase tracking-widest text-xs">Jaringan Media</h4>
            <div className="space-y-4">
              <Link 
                href="https://onislam.web.id" 
                target="_blank"
                className="group block p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/50 transition-all"
              >
                <p className="text-emerald-500 font-bold text-xs uppercase mb-1 group-hover:text-emerald-400">Media Islam Online</p>
                <p className="text-white font-semibold group-hover:underline">OnIslam.web.id</p>
              </Link>
              <p className="text-[10px] italic opacity-50">
                Update berita dan khazanah keislaman terkini melalui mitra media kami.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Tech Stack */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-xs">
            © {currentYear} <span className="text-white font-bold">Radio Suara Al Muttaqin</span>. 
            Part of Pondok Pesantren Islam Al Muttaqin Jepara.
          </div>
          
          <div className="flex items-center gap-6 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all">
            <span className="text-[10px] font-mono tracking-tighter uppercase">Powering by</span>
            <div className="flex gap-4">
               <span className="font-bold text-xs">NEXT.JS</span>
               <span className="font-bold text-xs">TAILWIND</span>
               <span className="font-bold text-xs">AZURACAST</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}