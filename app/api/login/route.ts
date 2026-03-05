import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Pastikan import prisma default (tanpa {}) sesuai perbaikan sebelumnya
import bcrypt from "bcryptjs";
import { SignJWT } from "jose"; // Instal: npm install jose
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    if (!admin) {
      return NextResponse.json({ error: "Admin tidak ditemukan" }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, admin.password);

    if (!valid) {
      return NextResponse.json({ error: "Password salah" }, { status: 401 });
    }

    // --- LOGIKA BARU: BUAT TOKEN SESSION ---
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || "rsm-secret-key-123");
    const token = await new SignJWT({ id: admin.id, email: admin.email, role: admin.role })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("2h") // Token hangus dalam 2 jam
      .sign(secret);

    // Simpan di Cookie browser secara aman (HttpOnly)
    const cookieStore = await cookies();
    cookieStore.set("admin_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 2, // 2 jam
      path: "/",
    });

    return NextResponse.json({ success: true, message: "Selamat Datang Admin!" });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}