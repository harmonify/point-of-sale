import { Injectable, Logger } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { IScriptService } from '@/scripts/script.interface';
import minimist from 'minimist';

@Injectable()
export class GenerateI18nTypesService implements IScriptService {
  private readonly logger = new Logger(GenerateI18nTypesService.name);

  constructor(private readonly i18nService: I18nService) {}

  run(args: minimist.ParsedArgs) {
    const result = this.i18nService.translate('test.test');
    this.logger.log(result);
  }
}
