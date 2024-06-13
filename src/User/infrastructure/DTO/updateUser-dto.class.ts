import { IsOptional, IsString, IsDate } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ required: false, description: 'The name of the user' })
  @IsOptional()
  @IsString()
  readonly name?: string;

  @ApiProperty({ required: false, description: 'The address of the user' })
  @IsOptional()
  @IsString()
  readonly address?: string;

  @ApiProperty({ required: false, description: 'The birthDate of the user' })
  @IsOptional()
  @IsDate()
  readonly birthDate?: Date;

  @ApiProperty({ required: false, description: 'The codePostal of the user' })
  @IsOptional()
  @IsString()
  readonly codePostal?: string;

  @ApiProperty({ required: false, description: 'The country of the user' })
  @IsOptional()
  @IsString()
  readonly country?: string;

  @ApiProperty({ required: false, description: 'The city of the user' })
  @IsOptional()
  @IsString()
  readonly city?: string;

  @ApiProperty({ required: false, description: 'The phoneNumber of the user' })
  @IsOptional()
  @IsString()
  readonly phoneNumber?: string;

  @ApiProperty({ required: false, description: 'The countryCode of the user' })
  @IsOptional()
  @IsString()
  readonly countryCode?: string;

  @ApiProperty({ required: false, description: 'The description of the user' })
  @IsOptional()
  @IsString()
  readonly description?: string;
}
