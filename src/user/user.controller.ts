import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { Tokens } from 'src/auth/types';
import { Public } from 'src/common/decorator';
import { CreateUserDto } from './dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Public()
  @Post('signup')
  async signup(@Body() dto: CreateUserDto): Promise<Tokens> {
    const user = await this.userService.signup(dto);
    const userId = user._id.toString();
    const tokens = await this.authService.getTokens(userId, user.toObject());
    await this.authService.updateRt(userId, tokens.refresh_token);
    return tokens;
  }
}
