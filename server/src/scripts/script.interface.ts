import type { ParsedArgs } from 'minimist';

export interface IScriptService {
  run(args: ParsedArgs): void | Promise<void>;
}
