import type { NextFunction, Request, Response } from 'express';
import type { NestMiddleware } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { getClientIp } from 'request-ip';

@Injectable()
export class RealIpMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next: NextFunction): void {
    (request.realIp as any) = getClientIp(request);
    next();
  }
}
