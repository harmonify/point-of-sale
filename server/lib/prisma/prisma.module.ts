import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";

@Module({
  providers: [PrismaService],
  export: [PrismaService],
})
export class PrismaModule {}
