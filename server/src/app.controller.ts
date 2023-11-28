import { NestConfigService } from '@/libs/config';
import { IResponseBody } from '@/libs/http';
import { SkipAuth } from '@/modules/auth';
import { Controller, Get, HttpStatus, VERSION_NEUTRAL } from '@nestjs/common';

@SkipAuth()
@Controller({ version: VERSION_NEUTRAL })
export class AppController {
  constructor(private readonly configService: NestConfigService) {}

  @Get()
  getHello(): IResponseBody {
    return {
      statusCode: HttpStatus.OK,
      message: 'Hello World!',
    };
  }
}
