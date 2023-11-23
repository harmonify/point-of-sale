import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

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

export class ResponseBodyDto<T = Record<string, any> | Array<any>> {
  @ApiProperty({ type: [HttpStatus] })
  statusCode: HttpStatus;

  @ApiProperty()
  message: string | string[];

  @ApiProperty()
  error?: string | string[];

  @ApiProperty()
  data?: T;

  @ApiProperty({ example: 1617826799860 })
  timestamp?: number;

  @ApiProperty({ example: 'Ax23489cvd' })
  requestId?: string;

  constructor(params: ResponseBodyDto<T>) {
    this.statusCode = params.statusCode;
    this.message = params.message;
    if (params.error) this.error = params.error;
    if (params.data) this.data = params.data;
    this.timestamp = params.timestamp ? params.timestamp : new Date().getTime();
    if (params.requestId) this.requestId = params.requestId;
  }
}
