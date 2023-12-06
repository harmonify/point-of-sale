import { AppModule } from '@/app.module';
import { HashUtil } from '@/common/utils';
import { TokenService } from '@/modules/auth';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Customer, ProductCategory, Provider, User } from '@prisma/client';
import {
  adminUser,
  customer,
  productCategory,
  provider,
  testUser,
} from '@test/fixtures';
import { PrismaService } from 'nestjs-prisma';

export class TestUtil {
  private app: INestApplication;
  private module: TestingModule;
  private prismaService: PrismaService;
  private tokenService: TokenService;

  async setup() {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    const app = module.createNestApplication();

    this.app = app;
    this.module = module;

    this.prismaService = app.get(PrismaService);
    this.tokenService = app.get(TokenService);

    await this.prismaService.$connect();
  }

  async teardown() {
    await this.prismaService.$disconnect();
    await this.app.close();
  }

  async getAuthToken() {
    return {
      accessToken: await this.tokenService.generateAccessToken(testUser),
      refreshToken: await this.tokenService.generateRefreshToken(testUser),
    };
  }

  async seed() {
    await this.seedUser(adminUser);
    await this.seedUser(testUser);
    await this.seedCustomer(customer);
    await this.seedProvider(provider);
    await this.seedProductCategory(productCategory);
  }

  async seedUser(user: User) {
    return this.prismaService.user.upsert({
      create: user,
      update: {
        ...user,
        password: await HashUtil.hash(user.password),
      },
      where: {
        id: user.id,
        email: user.email,
      },
    });
  }

  async seedCustomer(customer: Customer) {
    return this.prismaService.customer.upsert({
      create: customer,
      update: customer,
      where: {
        id: customer.id,
      },
    });
  }

  async seedProvider(provider: Provider) {
    return this.prismaService.provider.upsert({
      create: provider,
      update: provider,
      where: {
        id: provider.id,
      },
    });
  }

  async seedProductCategory(productCategory: ProductCategory) {
    return this.prismaService.productCategory.upsert({
      create: productCategory,
      update: productCategory,
      where: {
        id: productCategory.id,
      },
    });
  }
}
