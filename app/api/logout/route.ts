import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = await cookies();
    
    // Menghapus session admin dengan cara set expired langsung
    cookieStore.set("admin_session", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 0, // 0 detik = langsung terhapus dari browser
      path: "/",
    });

    return NextResponse.json({ 
      success: true, 
      message: "Berhasil keluar dari sistem" 
    });
  } catch (error) {
    console.error("LOGOUT ERROR:", error);
    return NextResponse.json(
      { error: "Gagal memproses logout" },
      { status: 500 }
    );
  }
}