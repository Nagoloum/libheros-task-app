import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ListsModule } from './lists/lists.module';
import { TasksModule } from './tasks/tasks.module';

import { UserSchema } from './schemas/user.schema';
import { TaskListSchema } from './schemas/task-list.schema';
import { TaskSchema } from './schemas/task.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // Connexion MongoDB Atlas
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI')!,
      }),
    }),

    // Schémas partagés
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'TaskList', schema: TaskListSchema },
      { name: 'Task', schema: TaskSchema },
    ]),

    // Modules applicatifs
    AuthModule,
    UsersModule,
    ListsModule,
    TasksModule,
  ],
})
export class AppModule {}