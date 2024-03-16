import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { parse } from 'yaml';
import { readFile } from 'fs/promises';

const swaggerRoute = 'doc';
const port = process.env.PORT || 4000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

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
