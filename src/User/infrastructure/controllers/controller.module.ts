import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { UsecasesProxyModule } from '../usercases-proxy/usecases-proxy.module';
import { LoginUseCases } from 'src/User/domain/port/input/use-cases/auth/login.usecases';

@Module({
  imports: [UsecasesProxyModule.register()],
  controllers: [AuthController],
  providers: [LoginUseCases],
})
export class ControllersModule {}
