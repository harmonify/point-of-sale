/* eslint-disable @typescript-eslint/no-unused-vars */
import 'tsconfig-paths/register';

import { AppModule } from '@/app.module';
import { HashUtil } from '@/common/utils';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'nestjs-prisma';

import { testUser } from './fixtures';

module.exports = async (globalConfig: any, projectConfig: any) => {
  const module: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = module.createNestApplication();

  const prismaService = app.get(PrismaService);

  await prismaService.$connect();

  await prismaService.user.upsert({
    create: testUser,
    update: {
      password: await HashUtil.encrypt(testUser.password),
      updatedAt: testUser.updatedAt,
    },
    where: {
      id: 2,
      email: testUser.email,
    },
  });

  await prismaService.$disconnect();

  // @ts-ignore
  globalThis._app = app;
};
