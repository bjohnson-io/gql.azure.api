const isProductionEnvironment = process.env.NODE_ENV !== 'production';
if (isProductionEnvironment) {
  require('dotenv').config();
}
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(isProductionEnvironment ? 80 : 3000);
}
bootstrap();
