"use client";

import dynamic from "next/dynamic";

const LeafletMap = dynamic(
  () => import("./LeafletMap"),
  { ssr: false }
);

export default function LiveListenerMap() {
  return (
    <div className="bg-white p-6 rounded-[2.5rem] border border-emerald-100 shadow-sm">
      <div className="h-72 w-full rounded-3xl overflow-hidden border border-gray-100 relative z-0">
        <LeafletMap />
      </div>
    </div>
  );
}