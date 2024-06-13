import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { UsecasesProxyModule } from '../usercases-proxy/usecases-proxy.module';
import { LoginUseCases } from 'src/User/domain/port/input/login.usecases';
import { CreateUserUseCase } from 'src/User/domain/port/input/create.usecases';
import { CreateUserController } from './create-user/create-user.controller';
import { UpdateUserUseCase } from 'src/User/domain/port/input/update.usecases';
import { UpdateUserController } from './update-user/update-user.controller';

@Module({
  imports: [UsecasesProxyModule.register()],
  controllers: [AuthController, CreateUserController, UpdateUserController],
  providers: [LoginUseCases, CreateUserUseCase, UpdateUserUseCase],
})
export class ControllersModule {}
