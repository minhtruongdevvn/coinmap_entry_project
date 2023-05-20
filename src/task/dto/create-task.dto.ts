import { User } from '@/common/database/schema/user.schema';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDate()
  @IsOptional()
  createdAt?: string;

  @IsDate()
  @IsOptional()
  updateAt?: Date;

  @IsNumber()
  point: number;

  @IsString()
  @IsNotEmpty()
  owner?: User | string;
}
