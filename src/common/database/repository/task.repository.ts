import { EntityRepository } from '@/common/database/repository/entity.repository';
import { Task, TaskDocument } from '@/common/database/schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TaskRepository extends EntityRepository<TaskDocument> {
  constructor(@InjectModel(Task.name) taskModel: Model<TaskDocument>) {
    super(taskModel);
  }
}
