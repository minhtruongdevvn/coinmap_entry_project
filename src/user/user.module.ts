import { AuthModule } from '@/auth/auth.module';
import { TaskModule } from '@/task/task.module';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  providers: [UserService],
  controllers: [UserController],
  imports: [TaskModule, AuthModule],
})
export class UserModule {}
