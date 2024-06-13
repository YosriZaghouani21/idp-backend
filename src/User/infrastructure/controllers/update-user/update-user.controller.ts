import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { IsAuthPresenter } from './update-user.presenter';
import { UsecasesProxyModule } from '../../usercases-proxy/usecases-proxy.module';
import { UseCaseProxy } from '../../usercases-proxy/usecases-proxy';
import { UpdateUserUseCase } from 'src/User/domain/port/input/update.usecases';
import { UpdateUserDto } from '../../DTO/updateUser-dto.class';
import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Put,
} from '@nestjs/common';
import { UserM } from 'src/User/domain/model/user';

@Controller('auth')
@ApiTags('auth')
@ApiResponse({
  status: 401,
  description: 'No authorization token was found',
})
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(IsAuthPresenter)
export class UpdateUserController {
  constructor(
    @Inject(UsecasesProxyModule.UPDATE_USER_USECASES_PROXY)
    private readonly UpdateUsecaseProxy: UseCaseProxy<UpdateUserUseCase>,
  ) {}

  @Put('update')
  @ApiBearerAuth()
  @ApiOperation({ description: 'update user' })
  async updateUser(@Body() updateUserDto: UpdateUserDto) {
    try {
      const userM: UserM = {
        name: updateUserDto.name,
        phoneNumber: updateUserDto.phoneNumber || '',
        countryCode: updateUserDto.countryCode || '',
        address: updateUserDto.address,
        birthDate: updateUserDto.birthDate,
        codePostal: updateUserDto.codePostal,
        country: updateUserDto.country,
        city: updateUserDto.city,
        description: updateUserDto.description || '',
      };

      const updateUserUseCase = this.UpdateUsecaseProxy.getInstance();
      const updatedUser = await updateUserUseCase.updateUser(userM);

      return {
        statusCode: HttpStatus.OK,
        message: 'User updated successfully',
        data: updatedUser,
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
