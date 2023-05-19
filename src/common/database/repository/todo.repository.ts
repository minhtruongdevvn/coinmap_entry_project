import { EntityRepository } from '@/common/database/repository/entity.repository';
import { Todo, TodoDocument } from '@/common/database/schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TodoRepository extends EntityRepository<TodoDocument> {
  constructor(@InjectModel(Todo.name) todoModel: Model<TodoDocument>) {
    super(todoModel);
  }
}
