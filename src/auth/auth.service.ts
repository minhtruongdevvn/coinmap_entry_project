import { UserRepository } from '@/common/database/repository';
import { User } from '@/common/database/schema/user.schema';
import { getHash, validateHash } from '@/common/helpers';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto';
import { JwtPayload, Tokens } from './type';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private config: ConfigService,
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async getTokens(userId: string, user: User): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: userId,
      email: user.email,
      role: user.role,
    };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('AT_SIGN_SECRET'),
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('RT_SIGN_SECRET'),
        expiresIn: '7d',
      }),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  async updateRt(userId: string, rt: string) {
    const hashRt = await getHash(rt);
    await this.userRepository.findOneAndUpdate(
      { id: userId },
      {
        hashRt,
      },
    );
  }

  async signIn(dto: SignInDto) {
    const userDoc = await this.userRepository.findOne({
      email: dto.email,
    });
    if (!userDoc) throw new UnauthorizedException(); // null

    const userId = userDoc.id;
    console.log(userDoc.id);
    const user = userDoc.toObject();
    const isValidPwd = await validateHash(dto.password, user.hash);
    if (!isValidPwd) throw new UnauthorizedException();

    const tokens = await this.getTokens(userId, user);
    await this.updateRt(userId, tokens.refresh_token);
    return tokens;
  }

  async logout(userId: string) {
    await this.userRepository.findOneAndUpdate(
      {
        _id: userId,
        hashRt: { $ne: null },
      },
      {
        hashRt: null,
      },
    );
  }

  async refreshToken(userId: string, rt: string) {
    const userDoc = await this.userRepository.findOne({ id: userId });
    if (!userDoc) throw new UnauthorizedException();

    const isValid =
      userDoc.hashRt == null ? false : validateHash(rt, userDoc.hashRt);
    if (!isValid) throw new UnauthorizedException();

    const tokens = await this.getTokens(userId, userDoc);
    await this.updateRt(userId, tokens.refresh_token);
    return tokens;
  }
}
