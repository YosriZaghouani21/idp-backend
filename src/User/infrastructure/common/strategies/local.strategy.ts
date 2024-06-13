import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { LoggerService } from '../../logger/logger.service';
import { ExceptionsService } from '../../exceptions/exceptions.service';
import { UsecasesProxyModule } from '../../usercases-proxy/usecases-proxy.module';
import { UseCaseProxy } from '../../usercases-proxy/usecases-proxy';
import { LoginUseCases } from 'src/User/domain/port/input/use-cases/auth/login.usecases';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(UsecasesProxyModule.LOGIN_USECASES_PROXY)
    private readonly loginUsecaseProxy: UseCaseProxy<LoginUseCases>,
    private readonly logger: LoggerService,
    private readonly exceptionService: ExceptionsService,
  ) {
    super();
  }

  async validate(email: string, password: string) {
    if (!email || !password) {
      this.logger.warn(
        'LocalStrategy',
        `email or password is missing, BadRequestException`,
      );
      this.exceptionService.UnauthorizedException();
    }
    const user = await this.loginUsecaseProxy
      .getInstance()
      .validateUserForJWTStragtegy(email);
    if (!user) {
      this.logger.warn('LocalStrategy', `Invalid email or password`);
      this.exceptionService.UnauthorizedException({
        message: 'Invalid email or password.',
      });
    }
    return user;
  }
}
