import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      database: 'todo',
      synchronize: true,
      entities: ['dist/**/*.entity.js'],
      type: 'postgres',
      password: '1234',
      port: 5432,
      username: 'postgres',
      host: 'localhost',
    }),
    UsersModule,
    TasksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
