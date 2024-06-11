import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvironmentConfigModule } from './infrastructure/config/environment-config/environment-config.module';
import { LoggerModule } from './infrastructure/logger/logger.module';
import { ExceptionsModule } from './infrastructure/exceptions/exceptions.module';
import { RepositoriesModule } from './infrastructure/repositories/repositories.module';
import { users } from './infrastructure/entities/user.entity';
import { ControllersModule } from './infrastructure/controllers/controller.module';
import { UsecasesProxyModule } from './infrastructure/usercases-proxy/usecases-proxy.module';
import { JwtModule } from '@nestjs/jwt';

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
        const dbUrl =
          'mongodb+srv://yosri:XympO44V7qQoumfS@idp.i24g5rc.mongodb.net/';
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
