import { AppModule } from '@/app.module';
import { HashUtil } from '@/common/utils';
import { TokenService } from '@/modules/auth';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import {
  Category,
  Customer,
  Notification,
  Procurement,
  Product,
  ProductUnit,
  Provider,
  Unit,
  User,
} from '@prisma/client';
import {
  adminUser,
  category,
  customer,
  dozenUnit,
  pieceUnit,
  procurement,
  product,
  productDozenUnit,
  productPieceUnit,
  provider,
  testUser,
} from '@test/fixtures';
import { notification } from '@test/fixtures/notification';
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
    await this.seedCategory(category);
    await this.seedNotification(notification);
    await this.seedUnit(pieceUnit);
    await this.seedUnit(dozenUnit);
    await this.seedProduct(product);
    await this.seedProductUnit(productPieceUnit);
    await this.seedProductUnit(productDozenUnit);
    await this.seedProcurement(procurement);
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

  seedCustomer(customer: Customer) {
    return this.prismaService.customer.upsert({
      create: customer,
      update: customer,
      where: {
        id: customer.id,
      },
    });
  }

  seedProvider(provider: Provider) {
    return this.prismaService.provider.upsert({
      create: provider,
      update: provider,
      where: {
        id: provider.id,
      },
    });
  }

  seedCategory(category: Category) {
    return this.prismaService.category.upsert({
      create: category,
      update: category,
      where: {
        id: category.id,
      },
    });
  }

  seedNotification(notification: Notification) {
    return this.prismaService.notification.upsert({
      create: notification,
      update: notification,
      where: {
        id: notification.id,
      },
    });
  }

  seedUnit(unit: Unit) {
    return this.prismaService.unit.upsert({
      create: unit,
      update: unit,
      where: {
        id: unit.id,
      },
    });
  }

  seedProduct(product: Product) {
    return this.prismaService.product.upsert({
      create: product,
      update: product,
      where: {
        id: product.id,
      },
    });
  }

  seedProductUnit(productUnit: ProductUnit) {
    return this.prismaService.productUnit.upsert({
      create: productUnit,
      update: productUnit,
      where: {
        id: productUnit.id,
      },
    });
  }

  seedProcurement(procurement: Procurement) {
    return this.prismaService.procurement.upsert({
      create: procurement,
      update: procurement,
      where: {
        id: procurement.id,
      },
    });
  }
}
