import { ApiProperty } from '@nestjs/swagger';
import { UserM } from 'src/User/domain/model/user';

export class IsUpdatedPresenter {
  @ApiProperty({
    example: 201,
    description: 'HTTP status code of the response',
  })
  statusCode: number;

  @ApiProperty({
    example: 'User updated successfully',
    description: 'Message about the operation result',
  })
  message: string;

  @ApiProperty({ type: () => UserM, description: 'Updated user details' })
  data: UserM;
}
