import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Response } from 'express';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('User CRUD API')
    .setDescription('API para gerenciar usuários')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Habilitando CORS
  app.enableCors({
    origin: '*', // http://localhost:5173
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization',
    credentials: true, // Habilita cookies
  });

  app.use((req, res: Response, next) => {
    res.header('Content-Type', 'application/json');
    res.header('Cache-Control', 'no-store');
    next();
  });

  app.use(helmet());

  await app.listen(3000);
}
bootstrap();
