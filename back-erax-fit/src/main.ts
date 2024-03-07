import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from './pipes/validation.pipe';
import { MainExceptionFilter } from './exceptions/main-exception.filter';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new MainExceptionFilter());
  app.setGlobalPrefix('api');
  app.useLogger(app.get(Logger));

  const config = new DocumentBuilder()
    .setTitle('Erax')
    .setDescription('Erax API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();
