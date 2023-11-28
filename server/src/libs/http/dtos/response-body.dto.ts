import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { httpMessage } from '../constants/http-message.constant';

/*
 * -----
 * 1. Get a participant
 * {
 *   "statusCode": HttpStatus.OK,
 *   "message": "Success",
 *   "data": {
 *     "name": "Researcher 1",
 *     "age": 25
 *   }
 * }
 *  conformed to ResponseBodyDto, ResponseBodyDto<Participant>
 * -----
 *
 * -----
 *  2. Get multiple participants
 * {
 *   "statusCode": HttpStatus.OK,
 *   "message": "Success",
 *   "data": [
 *     {
 *       "name": "Researcher 1",
 *       "age": 25
 *     },
 *     {
 *       "name": "Researcher 2",
 *       "age": 32
 *     }
 *   ]
 * }
 * conformed to ResponseBodyDto, ResponseBodyDto<Participant[]>
 * -----
 *
 * -----
 * 3. Validation error response example (docs: https://docs.nestjs.com/pipes#class-validator)
 * {
 *   "statusCode": HttpStatus.BAD_REQUEST,
 *   "message": [
 *     "name should not be empty"
 *     "name must be a string"
 *     "age should not be empty"
 *     "age must be an integer number"
 *   ],
 *   "error": "Bad Request"
 * }
 * conformed to ResponseBodyDto
 * -----
 */

export type IResponseBodyData =
  | Record<string, any>
  | Array<any>
  | null
  | undefined
  | void;

export type IResponseBody<T = IResponseBodyData> =
  | {
      statusCode?: HttpStatus;
      message?: string | string[];
      error?: string | string[];
      data?: T;
      timestamp?: number;
      requestId?: string;
    }
  | null
  | undefined
  | void;

export class ResponseBodyDto<T = IResponseBodyData> {
  @ApiProperty({ type: [HttpStatus] })
  statusCode: HttpStatus;

  @ApiProperty()
  message: string | string[];

  @ApiProperty()
  error?: string | string[];

  @ApiProperty()
  data: T;

  @ApiProperty({ example: 1617826799860 })
  timestamp: number;

  @ApiProperty({ example: 'Ax23489cvd' })
  requestId?: string;

  constructor(params: IResponseBody<T> = {}) {
    this.statusCode =
      params && params.statusCode
        ? params.statusCode
        : params && params.error
          ? HttpStatus.INTERNAL_SERVER_ERROR
          : HttpStatus.OK;

    if (params) {
      if (params.message) this.message = params.message;

      if (params.timestamp) this.timestamp = params.timestamp;

      if (params.error) this.error = params.error;

      if (params.data) this.data = params.data;

      if (params.requestId) this.requestId = params.requestId;
    }

    if (!this.message) {
      this.message = httpMessage[this.statusCode];
    }

    if (!this.timestamp) {
      this.timestamp = new Date().getTime();
    }
  }
}
