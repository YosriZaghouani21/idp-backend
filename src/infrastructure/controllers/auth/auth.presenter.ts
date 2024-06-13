import { ApiProperty } from '@nestjs/swagger';

export class IsAuthPresenter {
  @ApiProperty()
  name: string;
}
