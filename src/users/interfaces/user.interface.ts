import { Task } from 'src/tasks/entities/task.entity';

export interface userResponse {
  email: string;
  id: string;
  tasks: Task[];
}

export interface userResponseWithToken extends userResponse {
  token: string;
}
