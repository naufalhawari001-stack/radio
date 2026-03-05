import prisma from "@/lib/prisma";

export default async function ProgramSection() {
  let schedules: any[] = [];

  try {
    // Memanggil model 'schedule' (atau 'schedules', pastikan sesuai schema.prisma)
    schedules = await prisma.schedule.findMany({
      orderBy: [
        { day: "asc" },
        { start_time: "asc" }
      ]
    });
  } catch (error) {
    console.error("Gagal mengambil jadwal:", error);
  }

  const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Ahad"];

  return (
    <section id="jadwal" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-emerald-900 mb-4 font-serif">Jadwal Siaran</h2>
          <div className="h-1 w-20 bg-emerald-500 mx-auto rounded-full"></div>
          <p className="text-gray-600 mt-4 italic">Program Harian Radio Suara Al Muttaqin</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {days.map((day) => {
            const daySchedules = schedules.filter((s) => s.day === day);
            
            return (
              <div key={day} className="bg-emerald-50 rounded-3xl p-6 border border-emerald-100 shadow-sm">
                <h3 className="text-xl font-bold text-emerald-800 mb-6 flex items-center gap-2">
                  📅 {day}
                </h3>
                
                <div className="space-y-4">
                  {daySchedules.length > 0 ? (
                    daySchedules.map((program) => (
                      <div key={program.id} className="bg-white p-4 rounded-2xl shadow-sm border border-white">
                        <p className="text-xs font-bold text-emerald-600 mb-1">
                          {program.start_time?.slice(0, 5)} - {program.end_time?.slice(0, 5)}
                        </p>
                        {/* PERBAIKAN: Gunakan program_name, karena kolom 'program' tidak ada di DB */}
                        <p className="text-sm font-medium text-gray-800">
                          {program.program_name || program.program}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-gray-400 italic py-4 text-center border-2 border-dashed border-emerald-100 rounded-2xl">
                      Belum ada jadwal rutin
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}