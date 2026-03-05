import { PrismaClient } from "@prisma/client";

// Mencegah instansiasi ganda PrismaClient saat development (Next.js Hot Reload)
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

// INI KUNCINYA: Menambahkan default export agar import di page.tsx tidak error
export default prisma;