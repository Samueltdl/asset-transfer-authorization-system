import prisma from "../src/lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
  const hashedPassword = await bcrypt.hash("admin", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@senacrs.com.br" },
    update: {},
    create: {
      email: "admin@senacrs.com.br",
      name: "Administrador",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log("Usuário admin criado ou já existente:", admin.email);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
