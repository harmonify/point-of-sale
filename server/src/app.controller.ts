import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { NestConfigService } from './libs/config';
import { SkipAuth } from './modules/auth';
import { ResponseBodyDto } from './libs/http';

@SkipAuth()
@Controller()
export class AppController {
  constructor(private readonly configService: NestConfigService) {}

  @Get()
  getHello(): ResponseBodyDto {
    return {
      statusCode: HttpStatus.ACCEPTED,
      message: 'Hello World!',
      data: this.configService.isDev()
        ? {
            cpuUsage: process.cpuUsage(),
            memoryUsage: process.memoryUsage(),
            resourceUsage: process.resourceUsage(),
          }
        : undefined,
    };
  }
}
