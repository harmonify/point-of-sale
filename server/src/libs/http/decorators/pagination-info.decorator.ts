import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Request } from 'express';
import { RequestPaginationInfoDto } from '../dtos/request-pagination-info.dto';
import { StringUtil } from '@/common/utils';

export interface IPaginationQueryParam {
  perPage: number;
  page: number;
}

export const PaginationInfo = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    const page = StringUtil.toNumber({
      value: request.query['page'] as string,
      defaultValue: 1,
      isInteger: true,
    });
    const perPage = StringUtil.toNumber({
      value: request.query['per_page'] as string,
      defaultValue: 10,
      isInteger: true,
    });
    const search = request.query['search'] as string;
    const all = Boolean(request.query['all']);
    return new RequestPaginationInfoDto({
      all,
      page,
      perPage,
      search,
    });
  },
);
