import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './all.exceptions.filter';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    exceptionFactory: (errors) => {
      return new BadRequestException(
        errors.map(error => Object.values(error.constraints)).flat()
      );
    }
  }));

  app.enableCors();
  app.setGlobalPrefix('api');
  await app.listen(3000);
}
bootstrap();
