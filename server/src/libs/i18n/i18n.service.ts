import { Injectable } from '@nestjs/common';
import type { Path, TranslateOptions } from 'nestjs-i18n';
import { I18nContext, i18nValidationMessage } from 'nestjs-i18n';

@Injectable()
export class I18nService {
  translate(key: Path<I18nTranslations>, options: TranslateOptions = {}) {
    return I18nContext.current<I18nTranslations>()!.translate(key, options);
  }

  validationI18nMessage(key: Path<I18nTranslations>, arguments_?: any) {
    return i18nValidationMessage(key, arguments_);
  }
}
