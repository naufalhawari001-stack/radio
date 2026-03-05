import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = "admin@radio.com";
  const plainPassword = "admin123";

  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      role: "admin",
    },
  });

  console.log("Admin berhasil dibuat:");
  console.log("Email:", email);
  console.log("Password:", plainPassword);
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });