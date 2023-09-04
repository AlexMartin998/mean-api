import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from 'src/users/entities/user.entity';
import { LoginDto, RegisterDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async register(registerDto: RegisterDto): Promise<User> {
    try {
      const user = new this.userModel(registerDto);

      return await user.save();
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  login(loginUserDto: LoginDto) {
    console.log(loginUserDto);
  }

  private handleExceptions(error) {
    // Lo hacemos asi para EVITAR consultar la DB para verificar si existe tanto el name y el no
    if (+error.code === 11000)
      throw new BadRequestException(
        `User already registered with email: ${error.keyValue.email}`,
      );
    console.log(error);
    throw new InternalServerErrorException('Something went wrong!');
  }
}
