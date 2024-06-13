import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { JwtModule } from '@nestjs/jwt';
import { EnvironmentConfigModule } from './User/infrastructure/config/environment-config/environment-config.module';
import { LoggerModule } from './User/infrastructure/logger/logger.module';
import { ExceptionsModule } from './User/infrastructure/exceptions/exceptions.module';
import { RepositoriesModule } from './User/infrastructure/repositories/repositories.module';
import { ControllersModule } from './User/infrastructure/controllers/controller.module';
import { UsecasesProxyModule } from './User/infrastructure/usercases-proxy/usecases-proxy.module';
import { users } from './User/infrastructure/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => {
        const dbUrl = process.env.DATABASE_URL;
        console.log(`Connecting to database: ${dbUrl}`);
        return {
          type: 'mongodb',
          url: dbUrl,
          entities: [users],
          synchronize: false,
        };
      },
    }),
    TypeOrmModule.forFeature([users]),
    EnvironmentConfigModule,
    LoggerModule,
    ExceptionsModule,
    RepositoriesModule,
    ControllersModule,
    UsecasesProxyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
