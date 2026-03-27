import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskList, TaskListSchema } from '../schemas/task-list.schema';
import { Task, TaskSchema } from '../schemas/task.schema';
import { ListsService } from './lists.service';
import { ListsController } from './lists.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: TaskList.name, schema: TaskListSchema }, { name: Task.name, schema: TaskSchema } ]),
    AuthModule,
  ],
  providers: [ListsService],
  controllers: [ListsController],
  exports: [ListsService],
})
export class ListsModule {}