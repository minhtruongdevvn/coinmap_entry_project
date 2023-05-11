import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { UserSummary } from 'src/common/dto';
import { getHash } from 'src/helpers';
import { TodoStatus } from 'src/todo/schema/todo-status.enum';
import { Todo, TodoDocument } from 'src/todo/schema/todo.schema';
import { CreateUserDto } from './dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly model: Model<UserDocument>,
    @InjectModel(Todo.name) private readonly todoModel: Model<TodoDocument>,
  ) {}

  async signup(dto: CreateUserDto) {
    const hash = await getHash(dto.password);
    return await this.model.create({
      ...dto,
      hash,
    });
  }

  async update(id: string, dto: UpdateUserDto) {
    await this.model.findByIdAndUpdate(id, dto).exec();
  }

  getTodos(userId: string): Promise<Todo[]> {
    return this.todoModel.find(
      {
        owner: userId,
      },
      { owner: 0 },
    );
  }

  async getSummary(userId: string): Promise<UserSummary> {
    const summary = await this.todoModel
      .aggregate<UserSummary>([
        {
          $match: {
            status: TodoStatus.Completed,
            owner: new mongoose.Types.ObjectId(userId),
          },
        },
        ...this.getSummaryPipelineStages(),
      ])
      .exec();

    return summary[0];
  }

  getTopSummary(top: number): Promise<UserSummary[]> {
    return this.todoModel
      .aggregate<UserSummary>([
        {
          $match: {
            status: TodoStatus.Completed,
          },
        },
        ...this.getSummaryPipelineStages(),
        { $sort: { totalPoint: -1 } },
        { $limit: top },
      ])
      .exec();
  }

  private getSummaryPipelineStages() {
    return [
      {
        $lookup: {
          from: 'User',
          localField: 'owner',
          foreignField: '_id',
          as: 'owner',
        },
      },
      {
        $group: {
          _id: '$owner._id', // group by owner id
          owner: { $first: '$owner' },
          totalPoint: { $sum: '$point' },
          completed: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          'owner.hash': 0,
          'owner.hashRt': 0,
          'owner.email': 0,
          'owner.createdAt': 0,
          'owner.__v': 0,
        },
      },
    ];
  }
}
