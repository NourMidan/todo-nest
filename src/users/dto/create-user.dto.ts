import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password: string;
}
