import { Global, Module, RequestMethod } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { stdTimeFunctions } from 'pino';
import { LoggerService } from './logger.service';
import { APP_NAME } from '@/common/constants';

// Fields to redact from logs
const redactFields = [
  'req.headers.authorization',
  'req.body.password',
  'req.body.confirmPassword',
];
const basePinoOptions = {
  translateTime: "yyyy-mm-dd'T'HH:MM:sso",
  ignore: 'pid,hostname',
  singleLine: true,
  redact: redactFields,
};

@Global()
@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        /** NOTE: `timestamp` option append its string output to the JSON log output which may cause the logs to be invalid JSON. This may mess with the transports, such as `pino-pretty` or `pino/file`  */
        timestamp: stdTimeFunctions.isoTime,
        name: APP_NAME,
        customProps: (_request, _response) => ({
          context: 'HTTP',
        }),
        serializers: {
          req(request: Record<string, any>) {
            request.body = request.raw.body;

            return request;
          },
        },
        redact: {
          paths: redactFields,
          censor: '**GDPR COMPLIANT**',
        },
        transport: {
          targets: [
            {
              target: 'pino-pretty',
              level: process.env.NODE_ENV.startsWith('prod') ? 'info' : 'debug',
              options: {
                ...basePinoOptions,
                colorize: true,
              },
            },
            {
              target: 'pino/file',
              level: 'info', // log only errors to file
              options: {
                ...basePinoOptions,
                destination: 'logs/info.log',
                mkdir: true,
                sync: false,
              },
            },
            {
              target: 'pino/file',
              level: 'error', // log only errors to file
              options: {
                ...basePinoOptions,
                destination: 'logs/error.log',
                mkdir: true,
                sync: false,
              },
            },
          ],
        },
      },
      exclude: [{ method: RequestMethod.ALL, path: 'doc' }],
    }),
  ],
  providers: [LoggerService],
  exports: [LoggerModule, LoggerService],
})
export class NestLoggerModule {}
