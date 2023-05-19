import { AuthModule } from '@/auth/auth.module';
import { TodoModule } from '@/todo/todo.module';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  providers: [UserService],
  controllers: [UserController],
  imports: [TodoModule, AuthModule],
})
export class UserModule {}
