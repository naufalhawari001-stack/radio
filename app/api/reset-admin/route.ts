import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    // Tentukan email dan password baru antum di sini
    const email = "naufalhawari001@gmail.com";
    const passwordBaru = "admin12345"; // GANTI INI DENGAN PASSWORD YANG ANTUM MAU
    
    const hashedPassword = await bcrypt.hash(passwordBaru, 10);

    const admin = await prisma.admin.upsert({
      where: { email: email },
      update: { password: hashedPassword },
      create: {
        email: email,
        password: hashedPassword,
        role: "admin",
      },
    });

    return NextResponse.json({
      success: true,
      message: `Berhasil reset! Email: ${email} | Password: ${passwordBaru}`,
      data: admin
    });
  } catch (error) {
    return NextResponse.json({ error: "Gagal reset admin" }, { status: 500 });
  }
}