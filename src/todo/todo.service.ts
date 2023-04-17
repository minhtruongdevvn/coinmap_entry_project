import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoStatus } from './schema/todo-status.enum';
import { Todo, TodoDocument } from './schema/todo.schema';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo.name) private readonly model: Model<TodoDocument>,
  ) {}

  findAll(): Promise<Todo[]> {
    return this.model.find().exec();
  }

  findOne(id: string): Promise<Todo> {
    return this.model.findById(id).exec();
  }

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const res = await this.model.create({
      ...createTodoDto,
    });

    return await res.populate('owner', { hash: 0, hashRt: 0 });
  }

  update(id: string, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    return this.model.findByIdAndUpdate(id, updateTodoDto).exec();
  }

  delete(id: string): Promise<Todo> {
    return this.model.findByIdAndDelete(id).exec();
  }

  updateStatus(userId: string, todoId: string, status: TodoStatus) {
    return this.model
      .findOneAndUpdate(
        {
          owner: userId,
          _id: todoId,
        },
        {
          status,
        },
      )
      .exec();
  }
}
