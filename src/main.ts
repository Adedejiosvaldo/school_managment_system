import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { QueryFailedFilter } from './exception/EmailExist.query';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  //   app.useGlobalFilters(new QueryFailedFilter());
  await app.listen(3000);
}
bootstrap();
