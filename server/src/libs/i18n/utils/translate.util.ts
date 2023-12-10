import { I18nTranslations } from '@/generated/i18n-generated';
import { I18nContext } from 'nestjs-i18n';

import type { Path, TranslateOptions } from 'nestjs-i18n';

export const translate = (
  key: Path<I18nTranslations>,
  options: TranslateOptions = {},
) => I18nContext.current<I18nTranslations>()!.t(key, options);

export const t = translate;
