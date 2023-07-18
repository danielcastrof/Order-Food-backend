import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors();


  const config = new DocumentBuilder()
    .setTitle('Documentação com Swagger - Order Food API')
    .setDescription(
      'Projeto back-end DEV WEB.',
    )
    .setVersion('1.0')
    .addTag('Usuários')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(8000);
}
bootstrap();
