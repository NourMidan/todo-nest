import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  description: string;
}
