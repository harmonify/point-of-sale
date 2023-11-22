import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule, seconds } from '@nestjs/throttler';

@Module({
  imports: [
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService<Configs, true>) => ({
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
