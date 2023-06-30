import { TaskStatus } from '@/common/database/schema';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateTaskDto implements Partial<UpdateTaskDto> {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsDate()
  @IsOptional()
  createdAt: string;

  @IsDate()
  @IsOptional()
  updateAt: Date = new Date();

  @IsNumber()
  @IsOptional()
  status: TaskStatus;

  @IsNumber()
  @IsOptional()
  point: number;
}
