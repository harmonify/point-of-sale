import { Injectable, LoggerService as ILoggerService } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import _ from 'lodash';

interface ILoggingParams {
  message: string;
  traceId?: string;
  context?: string;
}

@Injectable()
export class LoggerService implements ILoggerService {
  constructor(private readonly logger: Logger) {}

  private buildLogMessage(params: ILoggingParams) {
    return _.pickBy(params, (value) => !_.isUndefined(value)) as ILoggingParams;
  }

  log(params: ILoggingParams) {
    this.logger.log(this.buildLogMessage(params));
  }

  error(params: ILoggingParams) {
    this.logger.error(this.buildLogMessage(params));
  }

  warn(params: ILoggingParams) {
    this.logger.warn(this.buildLogMessage(params));
  }

  debug(params: ILoggingParams) {
    this.logger.debug(this.buildLogMessage(params));
  }

  verbose(params: ILoggingParams) {
    this.logger.verbose(this.buildLogMessage(params));
  }

  fatal(params: ILoggingParams) {
    this.logger.fatal(this.buildLogMessage(params));
  }
}
