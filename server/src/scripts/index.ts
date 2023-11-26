import { INestApplicationContext, Logger, Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import minimist from 'minimist';
import path from 'path';

import {
  GenerateI18nTypesModule,
  GenerateI18nTypesService,
} from './generate-i18n-types';
import { IScriptService } from './script.interface';
import { ScriptModule } from './script.module';

const scriptLogger = new Logger('Script');

/**
 * Application, Service factory
 * @param name: command or script name
 * @returns
 */
async function create(
  name: string,
): Promise<[INestApplicationContext, IScriptService]> {
  let module: any;
  let service: any;

  switch (name) {
    case 'generate-i18n-types':
      module = GenerateI18nTypesModule;
      service = GenerateI18nTypesService;
      break;
    default:
      throw new Error(`Script with the command name ${name} is not defined`);
  }

  const app = await NestFactory.createApplicationContext(
    ScriptModule.for(module),
  );

  return [app, app.get(service)];
}

/**
 * run the standalone app
 * @returns void
 */
async function bootstrap(main: NodeJS.Module) {
  scriptLogger.log('Parsing the script arguments');

  let cmd: string;
  let args: minimist.ParsedArgs;
  const currentRelativeFilename = path.relative(process.cwd(), main.filename);
  try {
    // ts-node <this-bootstrap-script> <the-actual-script> [...args]
    if (process.argv.length < 3) {
      throw new Error(
        `Usage: ts-node ${currentRelativeFilename} <script-name> [...args]`,
      );
    }
    cmd = process.argv[2];
    args = minimist(process.argv.slice(2));
  } catch (error) {
    scriptLogger.error('Failed to parse the script arguments');
    error.message.includes(currentRelativeFilename)
      ? scriptLogger.error(error.message)
      : scriptLogger.error(error.message, error.stack);
    process.exit(1);
  }

  scriptLogger.log('Creating the NestJS application');

  let app: INestApplicationContext;
  let service: IScriptService;
  try {
    [app, service] = await create(cmd);
    await service.run(args);
  } catch (error) {
    scriptLogger.error('Failed to create the NestJS application');
    scriptLogger.error(error.message, error.stack);
    process.exit(1);
  }

  scriptLogger.log('Running the script');

  try {
    [app, service] = await create(cmd);
    await service.run(args);
    return;
  } catch (error) {
    scriptLogger.error('Error while running the script');
    scriptLogger.error(error.message, error.stack);
    process.exit(1);
  } finally {
    scriptLogger.log('Script finished');
    app.close();
    process.exit(0);
  }
}

if (require.main === module) {
  bootstrap(require.main);
}
