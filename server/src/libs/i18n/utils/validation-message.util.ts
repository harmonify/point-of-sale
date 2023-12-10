import { I18nTranslations } from '@/generated/i18n-generated';
import { i18nValidationMessage } from 'nestjs-i18n';

import type { Path } from 'nestjs-i18n';

export const validationMessage = (
  key: Path<I18nTranslations>,
  arguments_?: any,
) => i18nValidationMessage(key, arguments_);
