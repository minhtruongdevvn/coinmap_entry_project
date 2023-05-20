import { TaskRepository, UserRepository } from '@/common/database/repository';
import { Task, TaskStatus, User } from '@/common/database/schema';
import { UserSummary } from '@/common/dto';
import { EntityId, getHash } from '@/common/helpers';
import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject(TaskRepository)
    private readonly taskRepository: TaskRepository,
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async signup(dto: CreateUserDto) {
    const hash = await getHash(dto.password);
    return await this.userRepository.create({
      ...dto,
      hash,
    });
  }

  profile(userId: string): Promise<User> {
    return this.userRepository.findOne({ _id: userId });
  }

  find(): Promise<User[]> {
    return this.userRepository.find();
  }

  async update(_id: string, dto: UpdateUserDto) {
    await this.userRepository.findOneAndUpdate({ _id }, dto);
  }

  getTasks(userId: string): Promise<Task[]> {
    return this.taskRepository.find(
      {
        owner: userId,
      },
      { owner: 0 },
    );
  }

  async getSummary(userId: string): Promise<UserSummary> {
    const summary = await this.taskRepository
      .aggregate<UserSummary>()
      .match({
        status: TaskStatus.Completed,
        owner: new EntityId(userId),
      })
      .processSummaryData()
      .exec();

    return summary[0];
  }

  getTopSummary(top: number): Promise<UserSummary[]> {
    return this.taskRepository
      .aggregate<UserSummary>()
      .match({ status: TaskStatus.Completed })
      .processSummaryData()
      .sort({ totalPoint: -1 })
      .limit(top)
      .exec();
  }
}
