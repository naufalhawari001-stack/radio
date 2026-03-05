"use client";

export default function LogoutButton() {
  const handleLogout = async () => {
    if (confirm("Apakah antum yakin ingin keluar dari Dashboard?")) {
      const res = await fetch("/api/logout", { method: "POST" });
      if (res.ok) {
        window.location.href = "/login";
      }
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="inline-flex items-center px-6 py-3 bg-red-50 border border-red-100 rounded-2xl text-red-600 font-black hover:bg-red-100 transition-all shadow-sm active:scale-95 text-[10px] uppercase tracking-widest"
    >
      🚪 Keluar Sistem
    </button>
  );
}