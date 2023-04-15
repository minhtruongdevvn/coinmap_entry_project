import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser, Public } from '../common/decorator';
import { RtGuard } from '../common/guards';
import { AuthService } from './auth.service';
import { SigninDto } from './dto';
import { JwtRefreshPayload, Tokens } from './types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('signin')
  signin(@Body() dto: SigninDto): Promise<Tokens> {
    return this.authService.signin(dto);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@GetUser('sub') id: string) {
    return this.authService.logout(id);
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshToken(@GetUser() user: JwtRefreshPayload) {
    return this.authService.refreshToken(user.sub, user.refreshToken);
  }
}
