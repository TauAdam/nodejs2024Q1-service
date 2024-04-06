import { ConsoleLogger, Injectable, LogLevel } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';
import * as fsPromises from 'fs/promises';
import { LOG_LEVEL_VALUES } from 'src/logging/types';

@Injectable()
export class LoggingService extends ConsoleLogger {
  constructor(
    context: string,
    private readonly configService: ConfigService,
  ) {
    super(context);

    const TARGET_LEVEL =
      this.configService.get<number>('TARGET_LOG_LEVEL') || 5;
    const enabledLogLevels = Object.keys(LOG_LEVEL_VALUES).filter(
      (level) => LOG_LEVEL_VALUES[level] <= TARGET_LEVEL,
    ) as LogLevel[];
    this.setLogLevels(enabledLogLevels);
  }

  log(message: any, context?: string) {
    this.writeToFile('log', message, context);
    super.log(message, context);
  }
  fatal(message: any, context?: string) {
    this.writeToFile('fatal', message, context);
    super.fatal(message, context);
  }
  error(message: any, trace?: string, context?: string) {
    this.writeToFile('error', message, context);
    super.error(message, trace, context);
  }
  warn(message: any, context?: string) {
    this.writeToFile('warn', message, context);
    super.warn(message, context);
  }
  debug(message: any, context?: string) {
    this.writeToFile('debug', message, context);
    super.debug(message, context);
  }
  verbose(message: any, context?: string) {
    this.writeToFile('verbose', message, context);
    super.verbose(message, context);
  }
  setErrorListeners() {
    process.on('uncaughtException', (error) => {
      const message = error instanceof Error ? error.message : String(error);
      this.error(message, error.stack);
      process.exit(1);
    });

    process.on('unhandledRejection', (reason) => {
      const message = reason instanceof Error ? reason.message : String(reason);
      this.error(message, reason instanceof Error ? reason.stack : undefined);
      process.exit(1);
    });
  }
  async writeToFile(entry: LogLevel, message: any, context?: string) {
    const formattedEntry = `${Intl.DateTimeFormat('en-US', {
      dateStyle: 'short',
      timeStyle: 'short',
      timeZone: 'Asia/Almaty',
    }).format(new Date())}\t${entry.toUpperCase()}\t[${context}]\t${message}\n`;

    try {
      if (!fs.existsSync(path.join(__dirname, '..', '..', 'logs'))) {
        await fsPromises.mkdir(path.join(__dirname, '..', '..', 'logs'));
      }
      await fsPromises.appendFile(
        path.join(__dirname, '..', '..', 'logs', 'myLogs.log'),
        formattedEntry,
      );
    } catch (e) {
      if (e instanceof Error) console.error(e.message);
    }
  }
}
