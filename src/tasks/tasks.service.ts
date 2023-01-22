import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto, user: User) {
    const { title, description } = createTaskDto;

    const task = this.taskRepository.create({ description, title, user });
    return await this.taskRepository.save(task);
  }

  async update(id: number, updateTaskDto: UpdateTaskDto, user: User) {
    const { status } = updateTaskDto;
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: { user: true },
    });
    if (!task) throw new NotFoundException('Task not found');
    if (task.user.id !== user.id) {
      throw new UnauthorizedException('unauthorized');
    } else {
      await this.taskRepository
        .update(id, { status })
        .then((response) => response.raw[0]);
      return { message: 'updated' };
    }
  }
}
