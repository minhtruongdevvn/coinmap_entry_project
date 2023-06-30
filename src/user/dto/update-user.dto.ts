import { Role } from '@/common/enum';
import { IsDate, IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto implements Partial<UpdateUserDto> {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsEnum(Role)
  role: Role;

  @IsDate()
  @IsOptional()
  updatedAt = new Date();
}
