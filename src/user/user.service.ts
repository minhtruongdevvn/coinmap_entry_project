import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { getHash } from 'src/helpers';
import { CreateUserDto } from './dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly model: Model<UserDocument>,
  ) {}

  async signup(dto: CreateUserDto) {
    const hash = await getHash(dto.password);
    return await this.model.create({
      ...dto,
      hash,
    });
  }
}
