import { DynamicModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskRepository, UserRepository } from './database/repository';
import { Task, TaskSchema, User, UserSchema } from './database/schema';

@Module({})
export class CommonModule {
  static forRoot(): DynamicModule {
    return {
      module: CommonModule,
      global: true,
      imports: [
        MongooseModule.forFeature([
          { name: Task.name, schema: TaskSchema },
          { name: User.name, schema: UserSchema },
        ]),
      ],
      providers: [TaskRepository, UserRepository],
      exports: [TaskRepository, UserRepository],
    };
  }
}
