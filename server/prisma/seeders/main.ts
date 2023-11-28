import 'tsconfig-paths/register';
import { PrismaClient, User } from '@prisma/client';
import { adminUser, testUser } from '@test/fixtures';

const prisma = new PrismaClient({
  log: ['error', 'info', 'query', 'warn'],
});

const users: User[] = [adminUser, testUser];

async function main() {
  console.log(`Start seeding ...`);
  for (const userData of users) {
    const user = await prisma.user.upsert({
      create: userData,
      update: {
        password: userData.password,
        // updatedAt: userData.updatedAt,
      },
      where: {
        id: userData.id,
        email: userData.email,
      },
    });
    console.log(`Created user with id: ${user.id}`);
  }
  console.log(`Seeding finished.`);
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
