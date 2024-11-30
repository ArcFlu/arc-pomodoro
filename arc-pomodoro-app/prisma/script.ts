import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// async function main() {
//   const user = await prisma.user.create({
//     data: {
//       name: 'John Doe',
//       email: '4ZK3a@example.com',
//     },
//   });
//   console.log(user);
// }
async function main() {
  const users = await prisma.user.findMany();
  console.log(users);
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
