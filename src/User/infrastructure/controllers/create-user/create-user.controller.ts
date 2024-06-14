import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { IsCreatedPresenter } from './create-user.presenter';
import { UsecasesProxyModule } from '../../usercases-proxy/usecases-proxy.module';
import { UseCaseProxy } from '../../usercases-proxy/usecases-proxy';
import { CreateUserUseCase } from 'src/User/domain/port/input/create.usecases';
import { CreateUserDto } from '../../DTO/createUser-dto.class';
import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { UserM } from 'src/User/domain/model/user';

@Controller('auth')
@ApiTags('auth')
@ApiResponse({
  status: 401,
  description: 'No authorization token was found',
})
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(IsCreatedPresenter)
export class CreateUserController {
  constructor(
    @Inject(UsecasesProxyModule.CREATE_USER_USECASES_PROXY)
    private readonly CreateUsecaseProxy: UseCaseProxy<CreateUserUseCase>,
  ) {}

  @Post('create')
  @ApiBearerAuth()
  @ApiOperation({ description: 'create user' })
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      // Map the CreateUserDto to a UserM object
      const userM: UserM = {
        id: '',
        name: createUserDto.name,
        email: createUserDto.email,
        phoneNumber: '',
        countryCode: '',
        password: createUserDto.password,
        address: createUserDto.address,
        birthDate: createUserDto.birthDate,
        codePostal: createUserDto.codePostal,
        country: createUserDto.country,
        city: createUserDto.city,
        Role: createUserDto.Role,
        createdAt: new Date(), // Set creation time to now
        image: '',
        Fonction: '',
        myProject: [],
        myRepo: [],
        resetLink: '',
        status: '',
        description: '',
        hashRefreshToken: '',
      };

      const createUserUseCase = this.CreateUsecaseProxy.getInstance();
      const createdUser = await createUserUseCase.create(userM);

      return {
        statusCode: HttpStatus.CREATED,
        message: 'User created successfully',
        data: createdUser,
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
