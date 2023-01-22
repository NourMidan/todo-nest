import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { AuthModule } from 'src/auth/auth.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [TasksController],
  providers: [TasksService],

  imports: [
    TypeOrmModule.forFeature([Task]),
    AuthModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
})
export class TasksModule {}
