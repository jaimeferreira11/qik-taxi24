import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  app.setGlobalPrefix('api/v1');

  const config = new DocumentBuilder()
    .setTitle('Taxi24 RESTFul API')
    .setDescription('Code challenge Qik - Endpoints')
    .setVersion('1.0')
    .setContact(
      'Jaime Ferreira',
      'https://www.linkedin.com/in/jaimeferreira91/',
      'jaimeferreira11@gmail.com',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/api-docs', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
