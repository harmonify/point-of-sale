import { Module } from '@nestjs/common';
import { ThrottlerModule, seconds } from '@nestjs/throttler';
import { NestConfigModule, NestConfigService } from '@/libs/config';

@Module({
  imports: [
    ThrottlerModule.forRootAsync({
      imports: [NestConfigModule],
      inject: [NestConfigService],
      useFactory: (config: NestConfigService) => ({
        ttl: config.get('throttle.ttl', seconds(10), { infer: true }),
        limit: config.get('throttle.limit', seconds(12), { infer: true }),
        ignoreUserAgents: [/nestify/i],
        throttlers: [
          {
            name: 'short',
            ttl: seconds(1),
            limit: 2,
          },
          {
            name: 'long',
            ttl: seconds(60),
            limit: 100,
          },
        ],
      }),
    }),
  ],
  exports: [ThrottlerModule],
})
export class NestThrottlerModule {}
