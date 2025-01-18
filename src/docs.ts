import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const swaggerDocumentation = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('TEDDY FINANCE API')
    .setDescription('TEDDY FINANCE API')
    .setVersion('1.0')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);
};
