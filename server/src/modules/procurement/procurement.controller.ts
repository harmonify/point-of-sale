import {
  IResponseBody,
  PaginationInfo,
  RequestPaginationInfoDto,
} from '@/libs/http';
import { CurrentUser } from '@/modules/auth';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';

import {
  CreateProcurementRequestDto,
  ProcurementInfoResponseDto,
  ProcurementResponseDto,
  UpdateProcurementRequestDto,
} from './dtos';
import { ProcurementService } from './procurement.service';

@ApiTags('Procurements')
@Controller({ path: '/procurements', version: '1' })
export class ProcurementController {
  constructor(private readonly procurementService: ProcurementService) {}

  @Post()
  async create(
    @Body() data: CreateProcurementRequestDto,
    @CurrentUser() user: User,
  ): Promise<IResponseBody<ProcurementResponseDto>> {
    return {
      data: await this.procurementService.create(data, user.id),
    };
  }

  @Get()
  async findAll(
    @PaginationInfo() paginationInfo: RequestPaginationInfoDto,
  ): Promise<IResponseBody<ProcurementInfoResponseDto[]>> {
    return {
      data: await this.procurementService.findAll(paginationInfo),
    };
  }

  @Get('/:id')
  async findOne(
    @Param('id') id: number,
  ): Promise<IResponseBody<ProcurementInfoResponseDto>> {
    return {
      data: await this.procurementService.findOne(id),
    };
  }

  @Put('/:id')
  async update(
    @Param('id') id: number,
    @Body() data: UpdateProcurementRequestDto,
    @CurrentUser() user: User,
  ): Promise<IResponseBody<ProcurementResponseDto>> {
    return {
      data: await this.procurementService.update(id, data, user.id),
    };
  }

  @Delete('/:id')
  async delete(
    @Param('id') id: number,
    @CurrentUser() user: User,
  ): Promise<IResponseBody> {
    await this.procurementService.softDelete(id, user.id);
  }
}
