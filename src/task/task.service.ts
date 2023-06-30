import { TaskRepository } from '@/common/database/repository';
import { Task } from '@/common/database/schema';
import { Inject, Injectable } from '@nestjs/common';
import { UpdateTaskStatusDto } from './dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @Inject(TaskRepository)
    private readonly taskRepository: TaskRepository,
  ) {}

  findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  async findById(_id: string): Promise<Task> {
    return this.taskRepository.findOne({ _id }, undefined, ['owner']);
  }

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const res = await this.taskRepository.create({
      ...createTaskDto,
    });

    return await res.populate('owner', { hash: 0, hashRt: 0 });
  }

  update(_id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    return this.taskRepository.findOneAndUpdate({ _id }, updateTaskDto);
  }

  delete(_id: string): Promise<void> {
    return this.taskRepository.findOneAndDelete({ _id });
  }

  updateStatus(dto: UpdateTaskStatusDto) {
    return this.taskRepository.findOneAndUpdate(
      {
        owner: dto.userId,
        _id: dto.taskId,
      },
      {
        status: dto.status,
      },
    );
  }
}
