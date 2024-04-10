import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { readFile } from 'fs/promises';
import { EnvService } from 'src/env/env.service';
import { HttpExceptionFilter } from 'src/http-exception-filter';
import { LoggingService } from 'src/logging/logging.service';
import { parse } from 'yaml';
import { AppModule } from './app.module';

const swaggerRoute = 'doc';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const configService = app.get(EnvService);
  const port = configService.get('PORT');

  const logger = app.get(LoggingService);
  app.useLogger(logger);

  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new HttpExceptionFilter(httpAdapterHost));

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const file = await readFile('doc/api.yaml', { encoding: 'utf-8' });
  const openApiDocument = parse(file);
  SwaggerModule.setup(swaggerRoute, app, openApiDocument);

  await app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log(
      `Swagger is running on http://localhost:${port}/${swaggerRoute}`,
    );
  });
}
bootstrap();
