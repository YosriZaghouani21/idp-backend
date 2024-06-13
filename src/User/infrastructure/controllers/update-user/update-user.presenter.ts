import { ApiProperty } from '@nestjs/swagger';
import { UserM } from 'src/User/domain/model/user';

export class IsAuthPresenter {
  @ApiProperty({
    example: 201,
    description: 'HTTP status code of the response',
  })
  statusCode: number;

  @ApiProperty({
    example: 'User created successfully',
    description: 'Message about the operation result',
  })
  message: string;

  @ApiProperty({ type: () => UserM, description: 'Created user details' })
  data: UserM;
}
