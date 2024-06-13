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
import { LoginUseCases } from 'src/User/domain/port/input/use-cases/auth/login.usecases';

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
        // {
        //   inject: [DatabaseUserRepository],
        //   provide: UsecasesProxyModule.IS_AUTHENTICATED_USECASES_PROXY,
        //   useFactory: (userRepo: DatabaseUserRepository) =>
        //     new UseCaseProxy(new IsAuthenticatedUseCases(userRepo)),
        // },
        // {
        //   inject: [],
        //   provide: UsecasesProxyModule.LOGOUT_USECASES_PROXY,
        //   useFactory: () => new UseCaseProxy(new LogoutUseCases()),
        // },
        // {
        //   inject: [DatabaseTodoRepository],
        //   provide: UsecasesProxyModule.GET_TODO_USECASES_PROXY,
        //   useFactory: (todoRepository: DatabaseTodoRepository) =>
        //     new UseCaseProxy(new GetTodoUseCases(todoRepository)),
        // },
        // {
        //   inject: [DatabaseTodoRepository],
        //   provide: UsecasesProxyModule.GET_TODOS_USECASES_PROXY,
        //   useFactory: (todoRepository: DatabaseTodoRepository) =>
        //     new UseCaseProxy(new getTodosUseCases(todoRepository)),
        // },
        // {
        //   inject: [LoggerService, DatabaseTodoRepository],
        //   provide: UsecasesProxyModule.POST_TODO_USECASES_PROXY,
        //   useFactory: (
        //     logger: LoggerService,
        //     todoRepository: DatabaseTodoRepository,
        //   ) => new UseCaseProxy(new addTodoUseCases(logger, todoRepository)),
        // },
        // {
        //   inject: [LoggerService, DatabaseTodoRepository],
        //   provide: UsecasesProxyModule.PUT_TODO_USECASES_PROXY,
        //   useFactory: (
        //     logger: LoggerService,
        //     todoRepository: DatabaseTodoRepository,
        //   ) => new UseCaseProxy(new updateTodoUseCases(logger, todoRepository)),
        // },
        // {
        //   inject: [LoggerService, DatabaseTodoRepository],
        //   provide: UsecasesProxyModule.DELETE_TODO_USECASES_PROXY,
        //   useFactory: (
        //     logger: LoggerService,
        //     todoRepository: DatabaseTodoRepository,
        //   ) => new UseCaseProxy(new deleteTodoUseCases(logger, todoRepository)),
        // },
        ControllersModule,
      ],
      exports: [UsecasesProxyModule.LOGIN_USECASES_PROXY],
    };
  }
}
