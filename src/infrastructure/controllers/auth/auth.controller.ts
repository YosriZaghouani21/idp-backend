import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { AuthLoginDto } from './auth-dto.class';
import { IsAuthPresenter } from './auth.presenter';
// import { JwtAuthGuard } from '../../common/guards/jwtAuth.guard';
import { LoginGuard } from '../../common/guards/login.guard';
// import JwtRefreshGuard from '../../common/guards/jwtRefresh.guard';
import { UseCaseProxy } from 'src/infrastructure/usercases-proxy/usecases-proxy';
import { UsecasesProxyModule } from 'src/infrastructure/usercases-proxy/usecases-proxy.module';
import { LoginUseCases } from '../../../use-cases/auth/login.usecases';
import { UserM } from 'src/domain/model/user';
import { ApiResponseType } from '../../common/swagger/response.decorator';
import { JwtAuthGuard } from 'src/infrastructure/common/guards/jwtAuth.guard';

@Controller('auth')
@ApiTags('auth')
@ApiResponse({
  status: 401,
  description: 'No authorization token was found',
})
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(IsAuthPresenter)
export class AuthController {
  constructor(
    @Inject(UsecasesProxyModule.LOGIN_USECASES_PROXY)
    private readonly loginUsecaseProxy: UseCaseProxy<LoginUseCases>,
  ) {}
  // @Post('login')
  // @ApiBearerAuth()
  // @ApiBody({ type: AuthLoginDto })
  // @ApiOperation({ description: 'login' })
  // async login(
  //   @Body() auth: AuthLoginDto,
  // ): Promise<{ token: string; user: UserM }> {
  //   const { email, password } = auth;
  //   const { token, user } = await this.loginUsecaseProxy
  //     .getInstance()
  //     .execute(email, password);
  //   return { token, user };
  // }
  @Post('login')
  @ApiBearerAuth()
  @ApiBody({ type: AuthLoginDto })
  @ApiOperation({ description: 'login' })
  async login(@Body() auth: AuthLoginDto, @Request() request: any) {
    const accessTokenCookie = await this.loginUsecaseProxy
      .getInstance()
      .getCookieWithJwtToken(auth.email);
    const refreshTokenCookie = await this.loginUsecaseProxy
      .getInstance()
      .getCookieWithJwtRefreshToken(auth.email);
    request.res.setHeader('Set-Cookie', [
      accessTokenCookie,
      refreshTokenCookie,
    ]);
    return 'Login successful';
  }

  // @Get('is_authenticated')
  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  // @ApiOperation({ description: 'is_authenticated' })
  // @ApiResponseType(IsAuthPresenter, false)
  // async isAuthenticated(@Req() request: any) {
  //   const user = await this.isAuthUsecaseProxy.getInstance().execute(request.user.username);
  //   const response = new IsAuthPresenter();
  //   response.username = user.username;
  //   return response;
  // }
}
