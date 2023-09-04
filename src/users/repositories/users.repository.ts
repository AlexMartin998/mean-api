import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { RegisterDto } from 'src/auth/dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(registerDto: RegisterDto): Promise<User> {
    const user = new this.userModel(registerDto);

    return user.save();
  }
}
