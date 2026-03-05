"use client";
import dynamic from "next/dynamic";

const LeafletMap = dynamic(() => import("./LeafletMap"), { 
  ssr: false,
  loading: () => <div className="h-full w-full bg-gray-100 animate-pulse rounded-3xl" />
});

export default function AdminMapWrapper() {
  return (
    <div className="h-[400px] w-full relative"> 
      <LeafletMap />
    </div>
  );
}