import { ResponseBodyDto } from '@/libs/http';
import { HttpStatus } from '@nestjs/common';
import { PrismaClientErrorCode } from '../enums';

export const prismaHttpClientErrorRecord = {
  [PrismaClientErrorCode.P2000]: {
    statusCode: HttpStatus.BAD_REQUEST,
    message: 'The provided value is too long',
  },
  [PrismaClientErrorCode.P2002]: {
    statusCode: HttpStatus.CONFLICT,
    message: 'The record is already exist',
  },
  [PrismaClientErrorCode.P2005]: {
    statusCode: HttpStatus.BAD_REQUEST,
    message: 'The provided data type is invalid',
  },
  [PrismaClientErrorCode.P2006]: {
    statusCode: HttpStatus.BAD_REQUEST,
    message: 'The provided data is invalid',
  },
  [PrismaClientErrorCode.P2007]: {
    statusCode: HttpStatus.BAD_REQUEST,
    message: 'The provided data is invalid',
  },
  [PrismaClientErrorCode.P2011]: {
    statusCode: HttpStatus.BAD_REQUEST,
    message: 'One or more data should not be empty',
  },
  [PrismaClientErrorCode.P2012]: {
    statusCode: HttpStatus.BAD_REQUEST,
    message: 'The provided data value for the column is too long',
  },
  [PrismaClientErrorCode.P2015]: {
    statusCode: HttpStatus.NOT_FOUND,
    message: 'The record is not found',
  },
  [PrismaClientErrorCode.P2019]: {
    statusCode: HttpStatus.BAD_REQUEST,
    message: 'The provided data is invalid',
  },
  [PrismaClientErrorCode.P2020]: {
    statusCode: HttpStatus.BAD_REQUEST,
    message: 'The provided data is out of range',
  },
  [PrismaClientErrorCode.P2025]: {
    statusCode: HttpStatus.NOT_FOUND,
    message: 'The provided data is invalid',
  },
} as Record<PrismaClientErrorCode, ResponseBodyDto | undefined>;
