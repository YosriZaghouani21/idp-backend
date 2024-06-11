import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { LoginUseCases } from 'src/use-cases/auth/login.usecases';
import { UsecasesProxyModule } from '../usercases-proxy/usecases-proxy.module';

@Module({
  imports: [UsecasesProxyModule.register()],
  controllers: [AuthController],
  providers: [LoginUseCases],
})
export class ControllersModule {}
