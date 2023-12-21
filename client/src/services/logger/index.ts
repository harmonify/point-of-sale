import { LOG_LEVEL } from "@/environment"

/** Signature of a logging function */
export interface LogFn {
  (message?: any, ...optionalParams: any[]): void
}

/** Basic logger interface */
export interface Logger {
  debug: LogFn
  info: LogFn
  warn: LogFn
  error: LogFn
}

/** Log levels */
export type LogLevel = "debug" | "info" | "warn" | "error" | undefined | false

const NO_OP: LogFn = (message?: any, ...optionalParams: any[]) => {}

/** Logger which outputs to the browser console */
export class ConsoleLogger implements Logger {
  readonly debug: LogFn
  readonly info: LogFn
  readonly warn: LogFn
  readonly error: LogFn

  constructor({ level }: { level: LogLevel }) {
    this.error = console.error.bind(console)
    this.warn = console.warn.bind(console)
    this.info = console.info.bind(console)
    this.debug = console.debug.bind(console)

    if (level === "debug") {
      // If you are wondering why the debug logs aren't showing, make sure to tick the 'Verbose' level log on your browser
      // On Chrome > Developer Menu > Console > 'Default levels' > tick 'Verbose'
    } else if (level === "info") {
      this.debug = NO_OP
    } else if (level === "warn") {
      this.info = NO_OP
      this.debug = NO_OP
    } else if (level === "error") {
      this.warn = NO_OP
      this.info = NO_OP
      this.debug = NO_OP
    } else {
      this.error = NO_OP
      this.warn = NO_OP
      this.info = NO_OP
      this.debug = NO_OP
    }
  }
}

export const logger = new ConsoleLogger({ level: LOG_LEVEL })
