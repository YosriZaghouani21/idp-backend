import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './infrastructure/common/filter/exception.filter';
import { LoggerService } from './infrastructure/logger/logger.service';
import * as cookieParser from 'cookie-parser';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const env = process.env.NODE_ENV ;
  app.use(cookieParser());

    // Filter
    app.useGlobalFilters(new AllExceptionFilter(new LoggerService()));


    await app.listen(3000);

    

}
bootstrap();
