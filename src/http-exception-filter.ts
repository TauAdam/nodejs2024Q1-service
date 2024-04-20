import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();

    const { statusCode, message } = this.getExceptionDetails(exception);

    this.logger.error(
      `${request.method} ${statusCode} ${message}`,
      exception instanceof HttpException ? exception.stack : undefined,
    );

    const responseBody = {
      statusCode,
      message,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(request),
    };
    httpAdapter.reply(ctx.getResponse(), responseBody, statusCode);
  }

  private getExceptionDetails(exception: unknown) {
    const isHttpException = exception instanceof HttpException;
    const statusCode = isHttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;
    const message = isHttpException
      ? exception.message
      : 'Internal Server Error';

    return { statusCode, message };
  }
}
