import { IsEnum } from 'class-validator';
import { Status } from '../entities/task.entity';

export class UpdateTaskDto {
  @IsEnum(Status)
  status: Status;
}
