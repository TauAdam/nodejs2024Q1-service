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
export class CustomExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(CustomExceptionFilter.name);
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const timestamp = new Date().toISOString();

    const { statusCode, message } = this.getExceptionDetails(exception);
    const path = httpAdapter.getRequestUrl(request);

    this.logger.error(
      `${request.method} ${statusCode} ${message}`,
      exception instanceof HttpException ? exception.stack : undefined,
    );

    const responseBody = { statusCode, timestamp, path, message };
    httpAdapter.reply(response, responseBody, statusCode);
  }

  private getExceptionDetails(exception: unknown) {
    const isHttpException = exception instanceof HttpException;
    const statusCode = isHttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;
    const message = isHttpException
      ? exception.message
      : 'Internal Server Error!';

    return { statusCode, message };
  }
}
