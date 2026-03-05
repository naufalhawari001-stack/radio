import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("admin_session")?.value;
  const { pathname } = request.nextUrl;

  // 1. Proteksi: Jika mencoba akses halaman admin tanpa token
  if (pathname.startsWith("/admin") && !token) {
    const loginUrl = new URL("/login", request.url);
    // Simpan halaman tujuan asli agar setelah login bisa diarahkan balik
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 2. Validasi: Jika ada token, coba verifikasi keasliannya
  if (pathname.startsWith("/admin") && token) {
    try {
      const secret = new TextEncoder().encode(
        process.env.JWT_SECRET || "rsm-secret-key-123"
      );
      await jwtVerify(token, secret);
      // Jika lolos verifikasi, izinkan masuk
      return NextResponse.next();
    } catch (error) {
      // Jika token palsu atau expired, tendang balik ke login
      console.error("Middleware Auth Error:", error);
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("admin_session");
      return response;
    }
  }

  // 3. Jika admin yang sudah login mencoba akses halaman login lagi, arahkan ke dashboard
  if (pathname === "/login" && token) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  return NextResponse.next();
}

// Konfigurasi rute mana saja yang harus diawasi oleh middleware ini
export const config = {
  matcher: ["/admin/:path*", "/login"],
};