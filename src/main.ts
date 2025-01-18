import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { constants } from './config/constants';
import { swaggerDocumentation } from './docs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe());
  swaggerDocumentation(app);
  await app.listen(process.env.PORT || constants.DEFAULT_API_PORT);
}
bootstrap();
