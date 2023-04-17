import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { TodoStatus } from '../schema/todo-status.enum';

export class UpdateTodoDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDate()
  @IsOptional()
  createdAt?: string;

  @IsDate()
  @IsOptional()
  updateAt: Date = new Date();

  @IsNumber()
  @IsOptional()
  status?: TodoStatus;

  @IsNumber()
  @IsOptional()
  point: number;
}
