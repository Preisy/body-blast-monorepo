import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from './pipes/validation.pipe';
import { AppErrorFilter, MainExceptionFilter } from './exceptions/main-exception.filter';
import { Logger } from 'nestjs-pino';
import { TelegramService } from './modules/telegram/telegram.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const service = app.get<TelegramService>(TelegramService);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new MainExceptionFilter(service));
  app.useGlobalFilters(new AppErrorFilter(service));
  app.setGlobalPrefix('api');
  app.useLogger(app.get(Logger));

  const config = new DocumentBuilder()
    .setTitle('Body_blast')
    .setDescription('Body_blast API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();
