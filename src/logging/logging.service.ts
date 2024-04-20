import { ConsoleLogger, Injectable, LogLevel } from '@nestjs/common';
import * as fs from 'fs';
import { mkdir, stat, writeFile } from 'fs/promises';
import * as path from 'path';
import { EnvService } from 'src/env/env.service';
import { LOG_LEVEL_VALUES } from 'src/logging/types';

@Injectable()
export class LoggingService extends ConsoleLogger {
  constructor(
    context: string,
    private readonly envService: EnvService,
  ) {
    super(context);

    this.setLogLevels(this.getEnabledLogLevels());
    this.handleUnexpectedErrors();
  }
  private readonly MAX_FILE_SIZE = this.envService.get('MAX_LOG_FILE_SIZE');
  private commonQuantity = 1;
  private errorQuantity = 1;
  private getEnabledLogLevels() {
    const TARGET_LEVEL = this.envService.get('TARGET_LOG_LEVEL');
    return Object.keys(LOG_LEVEL_VALUES).filter(
      (level) => LOG_LEVEL_VALUES[level] <= TARGET_LEVEL,
    ) as LogLevel[];
  }
  log(message: any, context?: string) {
    this.write('log', message, context);
    super.log(message, context);
  }
  fatal(message: any, context?: string) {
    this.write('fatal', message, context);
    super.fatal(message, context);
  }
  error(message: any, trace?: string, context?: string) {
    this.write('error', message, context);
    super.error(message, trace, context);
  }
  warn(message: any, context?: string) {
    this.write('warn', message, context);
    super.warn(message, context);
  }
  debug(message: any, context?: string) {
    this.write('debug', message, context);
    super.debug(message, context);
  }
  verbose(message: any, context?: string) {
    this.write('verbose', message, context);
    super.verbose(message, context);
  }
  handleUnexpectedErrors() {
    process.on('uncaughtException', (error) => {
      this.error(error.message, error.stack);
      process.exit(1);
    });

    process.on('unhandledRejection', (reason) => {
      const message = reason instanceof Error ? reason.message : String(reason);
      this.error(message, reason instanceof Error ? reason.stack : undefined);
      process.exit(1);
    });
  }
  async write(entry: LogLevel, message: any, context?: string) {
    const formattedLogEntry = `${this.getTimestamp()}\t${entry.toUpperCase()}\t[${context}]\t${message}\n`;

    if (entry === 'error') {
      this.errorQuantity = await this.writeToFile(
        formattedLogEntry,
        'error',
        this.errorQuantity,
      );
    } else {
      this.commonQuantity = await this.writeToFile(
        formattedLogEntry,
        'common',
        this.commonQuantity,
      );
    }
  }
  async writeToFile(message: string, type: 'error' | 'common', index = 1) {
    try {
      const logDir = path.join(__dirname, '..', '..', 'logs');
      if (!fs.existsSync(logDir)) await mkdir(logDir);
      let pathToFile = path.join(logDir, `${index}_${type}.log`);
      if (!fs.existsSync(pathToFile)) {
        await writeFile(pathToFile, '');
      }
      const { size } = await stat(pathToFile);
      if (size >= this.MAX_FILE_SIZE) {
        index++;
      }
      pathToFile = path.join(logDir, `${index}_${type}.log`);
      await writeFile(pathToFile, message, { flag: 'a' });
      return index;
    } catch (e) {
      if (e instanceof Error) console.error(e.message);
    }
  }
}
