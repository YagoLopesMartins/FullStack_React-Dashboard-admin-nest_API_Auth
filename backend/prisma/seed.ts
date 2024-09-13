import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
async function main() {
  const user = await prisma.user.upsert({
    where: { email: 'pedrog@gmail.com' },
    update: {},
    create: {
      name: 'Pedro',
      email: 'pedro@gmail.com',
      registration: '102030',
      password: 'pedro123', // TODO: Fazer hash da senha.
    },
  });

  console.log(user);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });
