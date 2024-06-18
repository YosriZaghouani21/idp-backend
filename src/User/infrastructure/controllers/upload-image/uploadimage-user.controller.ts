import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { IsUpdatedPresenter } from './uploadimage-user.presenter';
import { UsecasesProxyModule } from '../../usercases-proxy/usecases-proxy.module';
import { UseCaseProxy } from '../../usercases-proxy/usecases-proxy';
import {
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadimageUserUseCase } from 'src/User/domain/port/input/uploadimage.usecases';

@Controller('auth')
@ApiTags('auth')
@ApiResponse({
  status: 401,
  description: 'No authorization token was found',
})
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(IsUpdatedPresenter)
export class UploadUserController {
  constructor(
    @Inject(UsecasesProxyModule.UPLOAD_USER_IMAGE_USECASE_PROXY)
    private readonly UploadUsecaseProxy: UseCaseProxy<UploadimageUserUseCase>,
  ) {}

  @Post('upload/:id')
  @ApiBearerAuth()
  @ApiOperation({ description: 'Update user image' })
  @ApiResponse({
    status: 200,
    description: 'The image has been uploaded successfully.',
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@Param('id') id: string, @UploadedFile() file: any) {
    try {
      const { user } = await this.UploadUsecaseProxy.getInstance().upload(
        id,
        file,
      );
      console.log(file, 'file');
      console.log(id, 'id');
      console.log(user.email, 'user');

      return { message: 'Image uploaded successfully', user };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Failed to upload image',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
