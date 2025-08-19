import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();
async function main() {

  const hashedPassword = await bcrypt.hash('teste123', 10);

  const user = await prisma.user.upsert({
    where: { email: 'teste@teste.com' },
    update: {},
    create: {
      name: 'Teste',
      email: 'teste@teste.com',
      registration: '000001',
      password: hashedPassword,
    },
  });

    // 2) 10 usuários aleatórios
    const howMany = 10;
    const users = Array.from({ length: howMany }).map((_, i) => {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();

        // garanta unicidade simples via sufixo numérico
        const suffix = String(i + 1).padStart(2, '0');

        return {
            name: `${firstName} ${lastName}`,
            email: `${firstName}.${lastName}.${suffix}@example.com`.toLowerCase(),
            registration: faker.string.numeric(6), // ou outro formato
            password: hashedPassword,
        };
    });

    // createMany é bem mais rápido que criar 1 a 1.
    // Se seu modelo tem UNIQUE em email/registration,
    // `skipDuplicates` evita erro caso rode o seed mais de uma vez.
    const created = await prisma.user.createMany({
        data: users,
        skipDuplicates: true,
    });

  console.log(user);
  console.log(`Random users requested: ${howMany}, created: ${created.count}`);
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
