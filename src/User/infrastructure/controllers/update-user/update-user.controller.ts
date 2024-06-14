import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { IsUpdatedPresenter } from './update-user.presenter';
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
  Param,
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
@ApiExtraModels(IsUpdatedPresenter)
export class UpdateUserController {
  constructor(
    @Inject(UsecasesProxyModule.UPDATE_USER_USECASES_PROXY)
    private readonly UpdateUsecaseProxy: UseCaseProxy<UpdateUserUseCase>,
  ) {}

  // Inside UpdateUserController
  @Put('update/:id')
  @ApiBearerAuth()
  @ApiOperation({ description: 'Update user' })
  async updateUser(
    @Param('id') userId: any,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      const userExists = await this.UpdateUsecaseProxy.getInstance().updateUser(
        updateUserDto,
        userId,
      );
      if (!userExists) {
        throw new HttpException('User does not exist.', HttpStatus.NOT_FOUND);
      }

      const updatedFields: Partial<UserM> = {
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

      const updatedUser =
        await this.UpdateUsecaseProxy.getInstance().updateUser(
          updatedFields,
          userId,
        );
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
