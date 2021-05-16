import { ConfigService, ConfigType } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';

import { AppModule } from './app.module';
import AuthConfig from './config/auth.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const authConfig = configService.get<ConfigType<typeof AuthConfig>>('auth');
  app.enableCors({
    credentials: true,
    origin: authConfig.corsOrigins,
  });
  app.use(cookieParser(authConfig.cookieSecrets));

  const config = new DocumentBuilder().setTitle('NestJS Blog Course').setVersion('1.0').build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('explorer', app, document);
  await app.listen(configService.get<string>('PORT'));
}
bootstrap();
