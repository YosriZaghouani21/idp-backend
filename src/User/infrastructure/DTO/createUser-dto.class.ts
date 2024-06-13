import { IsNotEmpty, IsString, IsEmail, IsDate } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ required: true, description: 'The name of the user' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ required: true, description: 'The email of the user' })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({ required: true, description: 'The password of the user' })
  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @ApiProperty({ required: true, description: 'The role of the user' })
  @IsNotEmpty()
  @IsString()
  readonly Role: string;

  @ApiProperty({ required: true, description: 'The address of the user' })
  @IsNotEmpty()
  @IsString()
  readonly address: string;

  @ApiProperty({ required: true, description: 'The birthDate of the user' })
  @IsNotEmpty()
  @IsDate()
  readonly birthDate: Date;

  @ApiProperty({ required: true, description: 'The codePostal of the user' })
  @IsNotEmpty()
  @IsString()
  readonly codePostal: string;

  @ApiProperty({ required: true, description: 'The country of the user' })
  @IsNotEmpty()
  @IsString()
  readonly country: string;

  @ApiProperty({ required: true, description: 'The city of the user' })
  @IsNotEmpty()
  @IsString()
  readonly city: string;
}
