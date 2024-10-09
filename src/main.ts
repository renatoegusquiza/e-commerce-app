import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import serverlessExpress from '@codegenie/serverless-express';
import { Callback, Context, Handler } from 'aws-lambda';

const setupSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('E-Commerce API Documentation')
    .setDescription('E-Commerce API Documentation')
    .setVersion('1.0')
    .addTag('Products')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/documentation', app, document);
};

//* Only NestJS

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  setupSwagger(app);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();

//* With Serverless Framework

// let server: Handler;
// async function bootstrap(): Promise<Handler> {
//   const app = await NestFactory.create(AppModule);
//   app.setGlobalPrefix('api');
//   setupSwagger(app);
//   app.useGlobalPipes(new ValidationPipe());
//   await app.init();

//   const expressApp = app.getHttpAdapter().getInstance();
//   return serverlessExpress({ app: expressApp });
// }

// export const handler: Handler = async (
//   event: any,
//   context: Context,
//   callback: Callback,
// ) => {
//   server = server ?? (await bootstrap());
//   return server(event, context, callback);
// };
