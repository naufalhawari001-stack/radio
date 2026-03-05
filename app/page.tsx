import Hero from "@/components/Hero";
import LiveSection from "@/components/LiveSection";
import ScheduleSection from "@/components/ScheduleSection"; 
import InfoSection from "@/components/InfoSection"; 
import DonasiSection from "@/components/DonasiSection";

/**
 * RESET TOTAL ARIS: 
 * Menghapus semua fitur Map Listener yang bikin error.
 * Prioritas: Audio kembali normal.
 */
export default function Home() {
  return (
    <main className="relative min-h-screen bg-white">
      {/* 1. Header Hero */}
      <Hero />

      {/* 2. Player Utama (Visualizer Lightning) */}
      <LiveSection />

      {/* 3. Jadwal Siaran Santri */}
      <ScheduleSection /> 
      
      {/* 4. Warta Pondok (Info Section) */}
      <InfoSection />
      
      {/* 5. Sesi Donasi */}
      <DonasiSection />
    </main>
  );
}