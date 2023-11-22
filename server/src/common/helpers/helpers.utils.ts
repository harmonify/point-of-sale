import { NotFoundError } from '@mikro-orm/core';
import {
  HttpException,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { format, zonedTimeToUtc } from 'date-fns-tz';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { TimeoutError } from 'rxjs';

// import sharp from 'sharp';

const errorLogger = new Logger('Error');

export const HelperService = {
  isDev(): boolean {
    return process.env.NODE_ENV && process.env.NODE_ENV.startsWith('dev');
  },

  isProd(): boolean {
    return process.env.NODE_ENV && process.env.NODE_ENV.startsWith('prod');
  },

  getAppRootDir() {
    let currentDirectory = __dirname;

    while (!existsSync(join(currentDirectory, 'resources')))
      currentDirectory = join(currentDirectory, '..');

    return process.env.NODE_ENV === 'prod'
      ? join(currentDirectory, 'dist')
      : currentDirectory;
  },

  formatSearch(search: string): string {
    return `%${search
      .trim()
      .replaceAll('\n', ' ')
      .replaceAll(/\s\s+/g, ' ')
      .toLowerCase()}%`;
  },

  /* The `generateThumb` function takes an input image as a `Buffer` and a configuration object
containing the desired height and width of the thumbnail. It uses the `sharp` library to resize the
input image according to the provided configuration. The resized image is then converted to the PNG
format and returned as a `Buffer` wrapped in an `Observable`. */
  // generateThumb(
  //   input: Buffer,
  //   config: { height: number; width: number },
  // ): Observable<Buffer> {
  //   return from(sharp(input).resize(config).toFormat('png').toBuffer());
  // },

  /* The `getTimeInUtc` function takes a `Date` object or a string representation of a date as input and
returns a new `Date` object representing the same date and time in UTC timezone. */
  getTimeInUtc(date: Date | string): Date {
    const thatDate = date instanceof Date ? date : new Date(date);
    const currentUtcTime = zonedTimeToUtc(thatDate, 'UTC');

    return new Date(format(currentUtcTime, 'yyyy-MM-dd HH:mm:ss'));
  },

  /**
   * Map a known error into HTTP format
   */
  mapHttpError(error: Error): { error: HttpException; isUnknown: boolean } {
    const result: { error: HttpException; isUnknown: boolean } = {
      error: null as any,
      isUnknown: false,
    };

    if (error instanceof NotFoundException || error instanceof NotFoundError) {
      result.error = new NotFoundException(error);
    } else if (error instanceof TimeoutError) {
      result.error = new RequestTimeoutException(error);
    } else {
      result.error = new InternalServerErrorException();
      result.isUnknown = true;
    }

    return result;
  },
};
