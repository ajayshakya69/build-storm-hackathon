import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/api/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import { LoggerInterceptor } from './core/services/logger/logger.interceptor';
import { LoggerService } from './core/services/logger/logger.service';

async function bootstrap() {
  const logger = new Logger('App');
  const port = process.env.PORT ?? 3000;
  const app = await NestFactory.create(AppModule);
  const loggerService = app.get(LoggerService);
  // app.setGlobalPrefix('users');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidUnknownValues: false,
    }),
  );
  app.useGlobalInterceptors(new LoggerInterceptor(loggerService));
  app.enableCors({
    origin: '*',
  });
  const config = new DocumentBuilder()
    .setTitle('User service')
    .setDescription('The API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, documentFactory);

  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();
