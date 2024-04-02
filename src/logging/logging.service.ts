import { ConsoleLogger, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import path from 'path';
import fs from 'fs';
import { appendFile, mkdir } from 'fs/promises';
import { LogLevel, LogLevelType } from 'src/logging/types';

@Injectable()
export class LoggingService extends ConsoleLogger {
  constructor(private readonly configService: ConfigService) {
    super();
  }
  private readonly level = this.configService.get<number>('LOGGING_LEVEL') || 5;

  log(message: any, context?: string) {
    if (this.level >= LogLevel.LOG) {
      this.writeToFile('LOG', message, context);
      super.log(message, context);
    }
  }
  fatal(message: any, context?: string) {
    if (this.level >= LogLevel.FATAL) {
      this.writeToFile('FATAL', message, context);
      super.fatal(message, context);
    }
  }
  error(message: any, trace?: string, context?: string) {
    if (this.level >= LogLevel.ERROR) {
      this.writeToFile('ERROR', message, context);
      super.error(message, trace, context);
    }
  }
  warn(message: any, context?: string) {
    if (this.level >= LogLevel.WARN) {
      this.writeToFile('WARN', message, context);
      super.warn(message, context);
    }
  }
  debug(message: any, context?: string) {
    if (this.level >= LogLevel.DEBUG) {
      this.writeToFile('DEBUG', message, context);
      super.debug(message, context);
    }
  }
  verbose(message: any, context?: string) {
    if (this.level >= LogLevel.VERBOSE) {
      this.writeToFile('VERBOSE', message, context);
      super.verbose(message, context);
    }
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
  async writeToFile(entry: LogLevelType, message: any, context?: string) {
    const formattedEntry = `${Intl.DateTimeFormat('en-US', {
      dateStyle: 'short',
      timeStyle: 'short',
      timeZone: 'Asia/Almaty',
    }).format(new Date())}\t${entry}\t[${context}]\t${message}\n`;

    try {
      if (!fs.existsSync(path.join(__dirname, '..', '..', 'logs'))) {
        await mkdir(path.join(__dirname, '..', '..', 'logs'));
      }
      await appendFile(
        path.join(__dirname, '..', '..', 'logs', 'myLogs.log'),
        formattedEntry,
      );
    } catch (e) {
      if (e instanceof Error) console.error(e.message);
    }
  }
}
