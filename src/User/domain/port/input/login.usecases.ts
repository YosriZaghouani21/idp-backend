import {
  IJwtService,
  IJwtServicePayload,
} from 'src/User/domain/adapters/jwt.interface';
import { JWTConfig } from 'src/User/domain/config/jwt.interface';
import { ILogger } from 'src/User/domain/logger/logger.interface';
import { UserRepository } from '../output/userRepository.interface';
import { IBcryptService } from 'src/User/domain/adapters/bcrypt.interface';
import { UserM } from 'src/User/domain/model/user';

export class LoginUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly jwtTokenService: IJwtService,
    private readonly jwtConfig: JWTConfig,
    private readonly userRepository: UserRepository,
    private readonly bcryptService: IBcryptService,
  ) {}
  async execute(
    email: string,
    password: string,
  ): Promise<{ token: string; user: UserM }> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Email incorrect');
    }

    if (typeof password !== 'string' || typeof user.password !== 'string') {
      throw new Error('Password must be a string');
    }

    const isMatch = await this.bcryptService.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Email or password incorrect');
    }

    const payload: IJwtServicePayload = {
      id: user.id,
      name: user.name,
      email: user.email,
      Role: user.Role,
    };
    const secret = this.jwtConfig.getJwtSecret();
    const expiresIn = this.jwtConfig.getJwtExpirationTime() + 's';
    const token = this.jwtTokenService.createToken(payload, secret, expiresIn);
    return { token, user };
  }

  async validateUserForJWTStragtegy(username: string) {
    const user = await this.userRepository.getUserByUsername(username);
    if (!user) {
      return null;
    }
    return user;
  }
  async getUserIfRefreshTokenMatches(refreshToken: string, username: string) {
    const user = await this.userRepository.getUserByUsername(username);
    if (!user) {
      return null;
    }

    const isRefreshTokenMatching = await this.bcryptService.compare(
      refreshToken,
      user.hashRefreshToken,
    );
    if (isRefreshTokenMatching) {
      return user;
    }

    return null;
  }

  async setCurrentRefreshToken(refreshToken: string, username: string) {
    const currentHashedRefreshToken =
      await this.bcryptService.hash(refreshToken);
    await this.userRepository.updateRefreshToken(
      username,
      currentHashedRefreshToken,
    );
  }

  async getCookieWithJwtToken(email: string) {
    this.logger.log(
      'LoginUseCases execute',
      `The user ${email} have been logged.`,
    );
    const payload: IJwtServicePayload = {
      email: email,
      id: '',
      name: '',
      Role: '',
    };
    const secret = this.jwtConfig.getJwtSecret();
    const expiresIn = this.jwtConfig.getJwtExpirationTime() + 's';
    const token = this.jwtTokenService.createToken(payload, secret, expiresIn);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.jwtConfig.getJwtExpirationTime()}`;
  }

  async getCookieWithJwtRefreshToken(email: string) {
    this.logger.log(
      'LoginUseCases execute',
      `The user ${email} have been logged.`,
    );
    const payload: IJwtServicePayload = {
      email: email,
      id: '',
      name: '',
      Role: '',
    };
    const secret = this.jwtConfig.getJwtRefreshSecret();
    const expiresIn = this.jwtConfig.getJwtRefreshExpirationTime() + 's';
    const token = this.jwtTokenService.createToken(payload, secret, expiresIn);
    await this.setCurrentRefreshToken(token, email);
    const cookie = `Refresh=${token}; HttpOnly; Path=/; Max-Age=${this.jwtConfig.getJwtRefreshExpirationTime()}`;
    return cookie;
  }
}
