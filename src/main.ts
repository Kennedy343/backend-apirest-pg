import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,      // elimina propiedades que no están en el DTO
      forbidNonWhitelisted: true, // lanza error si hay propiedades extra
      transform: true,      // convierte automáticamente strings a números, booleans, etc.
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
