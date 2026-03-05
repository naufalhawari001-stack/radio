"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

export default function SearchInfo() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("q", term);
    } else {
      params.delete("q");
    }

    startTransition(() => {
      router.push(`/admin/info?${params.toString()}`);
    });
  };

  return (
    <div className="relative w-full mb-8">
      <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
        <span className="text-xl">🔍</span>
      </div>
      <input
        type="text"
        placeholder="Cari judul artikel atau konten... [Savage!]"
        className="w-full pl-14 pr-6 py-5 bg-white rounded-[2rem] border border-emerald-100 shadow-sm focus:ring-4 focus:ring-emerald-100 outline-none font-bold text-emerald-900 transition-all"
        defaultValue={searchParams.get("q")?.toString()}
        onChange={(e) => handleSearch(e.target.value)}
      />
      {isPending && (
        <div className="absolute right-6 top-5">
          <div className="animate-spin h-5 w-5 border-2 border-emerald-600 border-t-transparent rounded-full"></div>
        </div>
      )}
    </div>
  );
}