import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskList, TaskListSchema } from '../schemas/task-list.schema';
import { ListsService } from './lists.service';
import { ListsController } from './lists.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: TaskList.name, schema: TaskListSchema }]),
    AuthModule, // Pour avoir accès au JwtStrategy + CurrentUser
  ],
  providers: [ListsService],
  controllers: [ListsController],
  exports: [ListsService],
})
export class ListsModule {}