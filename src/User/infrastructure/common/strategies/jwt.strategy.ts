import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { ExceptionsService } from '../../exceptions/exceptions.service';
import { LoggerService } from '../../logger/logger.service';
import { UsecasesProxyModule } from '../../usercases-proxy/usecases-proxy.module';
import { UseCaseProxy } from '../../usercases-proxy/usecases-proxy';
import { LoginUseCases } from 'src/User/domain/port/input/login.usecases';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(UsecasesProxyModule.LOGIN_USECASES_PROXY)
    private readonly loginUsecaseProxy: UseCaseProxy<LoginUseCases>,
    private readonly logger: LoggerService,
    private readonly exceptionService: ExceptionsService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.Authentication;
        },
      ]),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    const user = this.loginUsecaseProxy
      .getInstance()
      .validateUserForJWTStragtegy(payload.username);
    if (!user) {
      this.logger.warn('JwtStrategy', `User not found`);
      this.exceptionService.UnauthorizedException({
        message: 'User not found',
      });
    }
    return user;
  }
}
