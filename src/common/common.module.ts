import { DynamicModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoRepository, UserRepository } from './database/repository';
import { Todo, TodoSchema, User, UserSchema } from './database/schema';

@Module({})
export class CommonModule {
  static forRoot(): DynamicModule {
    return {
      module: CommonModule,
      global: true,
      imports: [
        MongooseModule.forFeature([
          { name: Todo.name, schema: TodoSchema },
          { name: User.name, schema: UserSchema },
        ]),
      ],
      providers: [TodoRepository, UserRepository],
      exports: [TodoRepository, UserRepository],
    };
  }
}
