import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { getHash, validateHash } from 'src/helpers';
import { User, UserDocument } from 'src/user/schema/user.schema';
import { SigninDto } from './dto';
import { JwtPayload, Tokens } from './type';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private config: ConfigService,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
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
    await this.userModel
      .findByIdAndUpdate(userId, {
        hashRt,
      })
      .exec();
  }

  async signin(dto: SigninDto) {
    const userDoc = await this.userModel
      .findOne({
        email: dto.email,
      })
      .exec();
    if (!userDoc) throw new UnauthorizedException(); // null

    const userId = userDoc._id.toString();
    const user = userDoc.toObject();
    const isValidPwd = await validateHash(dto.password, user.hash);
    if (!isValidPwd) throw new UnauthorizedException();

    const tokens = await this.getTokens(userId, user);
    await this.updateRt(userId, tokens.refresh_token);
    return tokens;
  }

  async logout(userId: string) {
    await this.userModel
      .updateOne(
        {
          _id: userId,
          hashRt: { $ne: null },
        },
        {
          hashRt: null,
        },
      )
      .exec();
  }

  async refreshToken(userId: string, rt: string) {
    const userDoc = await this.userModel.findById(userId).exec();
    if (!userDoc) throw new UnauthorizedException();

    const isValid =
      userDoc.hashRt == null ? false : validateHash(rt, userDoc.hashRt);
    if (!isValid) throw new UnauthorizedException();

    const tokens = await this.getTokens(userId, userDoc);
    await this.updateRt(userId, tokens.refresh_token);
    return tokens;
  }
}
