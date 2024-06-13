import { DynamicModule, Module } from '@nestjs/common';

import { ExceptionsModule } from '../exceptions/exceptions.module';
import { LoggerModule } from '../logger/logger.module';
import { LoggerService } from '../logger/logger.service';

import { RepositoriesModule } from '../repositories/repositories.module';

import { DatabaseUserRepository } from '../repositories/user.repository';

import { EnvironmentConfigModule } from '../config/environment-config/environment-config.module';
import { EnvironmentConfigService } from '../config/environment-config/environment-config.service';
import { UseCaseProxy } from './usecases-proxy';

import { ControllersModule } from '../controllers/controller.module';
import { BcryptService } from '../services/bcrypt/bcrypt.service';
import { JwtTokenService } from '../services/jwt/jwt.service';
import { BcryptModule } from '../services/bcrypt/bcrypt.module';
import { JwtModule } from '../services/jwt/jwt.module';
import { LoginUseCases } from 'src/User/domain/port/input/login.usecases';
import { CreateUserUseCase } from 'src/User/domain/port/input/create.usecases';
import { UpdateUserUseCase } from 'src/User/domain/port/input/update.usecases';

@Module({
  imports: [
    LoggerModule,
    JwtModule,
    BcryptModule,
    EnvironmentConfigModule,
    RepositoriesModule,
    ExceptionsModule,
  ],
})
export class UsecasesProxyModule {
  // Auth
  static LOGIN_USECASES_PROXY = 'LoginUseCasesProxy';
  static CREATE_USER_USECASES_PROXY = 'CreateUserUseCasesProxy';
  static UPDATE_USER_USECASES_PROXY = 'UpdateUserUseCasesProxy';

  static register(): DynamicModule {
    return {
      module: UsecasesProxyModule,
      providers: [
        {
          inject: [
            LoggerService,
            JwtTokenService,
            EnvironmentConfigService,
            DatabaseUserRepository,
            BcryptService,
          ],
          provide: UsecasesProxyModule.LOGIN_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            jwtTokenService: JwtTokenService,
            config: EnvironmentConfigService,
            userRepo: DatabaseUserRepository,
            bcryptService: BcryptService,
          ) =>
            new UseCaseProxy(
              new LoginUseCases(
                logger,
                jwtTokenService,
                config,
                userRepo,
                bcryptService,
              ),
            ),
        },
        {
          inject: [DatabaseUserRepository, BcryptService],
          provide: UsecasesProxyModule.CREATE_USER_USECASES_PROXY,
          useFactory: (
            userRepo: DatabaseUserRepository,

            bcryptService: BcryptService,
          ) => new UseCaseProxy(new CreateUserUseCase(userRepo, bcryptService)),
        },
        {
          inject: [DatabaseUserRepository],
          provide: UsecasesProxyModule.UPDATE_USER_USECASES_PROXY,
          useFactory: (userRepo: DatabaseUserRepository) =>
            new UseCaseProxy(new UpdateUserUseCase(userRepo)),
        },
        ControllersModule,
      ],
      exports: [
        UsecasesProxyModule.LOGIN_USECASES_PROXY,
        UsecasesProxyModule.CREATE_USER_USECASES_PROXY,
        UsecasesProxyModule.UPDATE_USER_USECASES_PROXY,
      ],
    };
  }
}
