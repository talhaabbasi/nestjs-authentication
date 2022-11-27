import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import { JwtAuthGuard } from './utils/guards/jwt.auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalGuards(new JwtAuthGuard());
  app.enableCors({
    allowedHeaders: 'content-type',
    origin: 'http://localhost:3001',
    credentials: true,
  });

  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  const port = configService.get('port');
  await app.listen(port);
}
bootstrap();
