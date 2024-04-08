import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');
  use(req: Request, res: Response, next: () => void) {
    const { method, baseUrl, body, query } = req;
    const start = Date.now();

    res.on('finish', () => {
      const { statusCode } = res;
      const end = Date.now();
      const duration = end - start;
      const logMessage = `${method} ${baseUrl} ${JSON.stringify(query)} ${JSON.stringify(body)} -> ${statusCode} ${duration}ms`;

      if (statusCode >= 500) {
        this.logger.error(logMessage);
      } else if (statusCode >= 400) {
        this.logger.warn(logMessage);
      } else if (statusCode >= 300) {
        this.logger.log(logMessage);
      } else {
        this.logger.verbose(logMessage);
      }
    });

    next();
  }
}
