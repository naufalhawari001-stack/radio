import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://rsm.my.id/api/station/salaam/listeners", {
      headers: {
        // Gunakan API Key dari Server Side (.env, bukan NEXT_PUBLIC)
        "Authorization": `Bearer ${process.env.AZURACAST_API_KEY}`,
        "Accept": "application/json"
      },
      next: { revalidate: 0 } // Jangan di-cache agar real-time
    });

    if (!res.ok) throw new Error("Gagal ambil data AzuraCast");
    
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch listeners" }, { status: 500 });
  }
}