import { ApiProperty } from '@nestjs/swagger';
import { UserM } from 'src/User/domain/model/user';

export class IsDeletedPresenter {
  @ApiProperty({
    example: 201,
    description: 'HTTP status code of the response',
  })
  statusCode: number;

  @ApiProperty({
    example: 'User deleted successfully',
    description: 'Message about the operation result',
  })
  message: string;

  @ApiProperty({ type: () => UserM, description: 'deleted user details' })
  data: UserM;
}
