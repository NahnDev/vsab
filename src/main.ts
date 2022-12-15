import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { SerializerInterceptor } from './interceptors/serializer.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  });
  // app.setGlobalPrefix('api');
  // app.enableVersioning({
  //   prefix: 'v',
  //   type: VersioningType.URI,
  //   defaultVersion: '1',
  // });

  const port = app.get(ConfigService).get<number>('server.port');
  const config = new DocumentBuilder().setTitle('VSA').addBearerAuth().build();
  const apiDoc = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, apiDoc);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalInterceptors(new SerializerInterceptor(app.get(Reflector)));
  await app.listen(port, () => {
    console.log(`Server running in port ${port}`);
  });
}
bootstrap();
