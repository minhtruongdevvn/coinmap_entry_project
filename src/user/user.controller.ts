import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { Tokens } from 'src/auth/types';
import { GetUser, Public } from 'src/common/decorator';
import { CreateUserDto } from './dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Public()
  @Post()
  async signup(@Body() dto: CreateUserDto): Promise<Tokens> {
    const user = await this.userService.signup(dto);
    const userId = user._id.toString();
    const tokens = await this.authService.getTokens(userId, user.toObject());
    await this.authService.updateRt(userId, tokens.refresh_token);
    return tokens;
  }

  @Get('todos')
  getTodos(@GetUser('sub') id: string) {
    return this.userService.getTodos(id);
  }

  @Get('summary')
  getSummary(@GetUser('sub') id: string) {
    return this.userService.getSummary(id);
  }

  @Get('top/:top')
  getTop(@Param('top', ParseIntPipe) top: number) {
    return this.userService.getTopSummary(top);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.userService.update(id, dto);
  }
}
