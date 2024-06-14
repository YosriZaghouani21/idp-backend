import {
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import {
  Param,
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Delete,
} from '@nestjs/common';
import { UsecasesProxyModule } from '../../usercases-proxy/usecases-proxy.module';
import { UseCaseProxy } from '../../usercases-proxy/usecases-proxy';
import { DeleteUserUseCase } from 'src/User/domain/port/input/delete.usecases';
import { IsDeletedPresenter } from './delete-user.presenter';

@ApiTags('auth')
@Controller('auth')
@ApiResponse({
  status: 401,
  description: 'No User token was found',
})
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(IsDeletedPresenter)
export class DeleteUserController {
  constructor(
    @Inject(UsecasesProxyModule.DELETE_USER_USECASES_PROXY)
    private readonly DeleteUsecaseProxy: UseCaseProxy<DeleteUserUseCase>,
  ) {}

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully deleted.',
  })
  async deleteUser(@Param('id') userId: string): Promise<any> {
    try {
      const deletedUser = await this.DeleteUsecaseProxy.executeMethod(
        'DeleteUser',
        [{ id: userId }],
      );
      return {
        statusCode: HttpStatus.OK,
        message: 'User deleted successfully',
        data: deletedUser,
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
