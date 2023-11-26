import path from 'node:path';

import { Global, Module } from '@nestjs/common';
import {
  AcceptLanguageResolver,
  CookieResolver,
  HeaderResolver,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n';
import { CUSTOM_LANG_HEADER } from '@/libs/http';

@Global()
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
        path: path.join(process.cwd(), 'src', 'resources', 'i18n'),
        watch: true,
        includeSubfolders: true,
      },
      typesOutputPath: path.join(
        process.cwd(),
        'src',
        'generated',
        'i18n-generated.ts',
      ),
      resolvers: [
        new HeaderResolver([CUSTOM_LANG_HEADER]),
        AcceptLanguageResolver,
        new CookieResolver(),
        { use: QueryResolver, options: ['lang', 'locale'] },
      ],
    }),
  ],
  exports: [I18nModule],
})
export class NestI18nModule {}
