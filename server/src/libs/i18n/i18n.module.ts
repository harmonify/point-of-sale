import path from 'node:path';

import { Module } from '@nestjs/common';
import {
  AcceptLanguageResolver,
  CookieResolver,
  HeaderResolver,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n';

@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      fallbacks: {
        'en-*': 'en',
        'en_*': 'en',
        en: 'en',
      },
      logging: true,
      loaderOptions: {
        path: path.join(`${process.cwd()}/src/resources/i18n/`),
        watch: true,
        includeSubfolders: true,
      },
      typesOutputPath: path.join(
        `${process.cwd()}/src/i18n/interfaces/i18n-generated.interface.ts`,
      ),
      resolvers: [
        new HeaderResolver(['x-custom-lang']),
        AcceptLanguageResolver,
        new CookieResolver(),
        { use: QueryResolver, options: ['lang', 'locale'] },
      ],
    }),
  ],
  exports: [I18nModule],
})
export class NestI18nModule {}
