import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { RegisterDto } from 'src/auth/dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UserRepository {
  private readonly logger = new Logger('UserRepository');

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(registerDto: RegisterDto): Promise<User> {
    try {
      const user = new this.userModel(registerDto);

      return await user.save();
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  private handleDBExceptions(error) {
    // // Lo hacemos asi para EVITAR consultar la DB para verificar si ya existen registros con esos unique
    // se q solo el email es unique, othewise it should be more generic
    if (+error.code === 11000)
      throw new BadRequestException(
        `User already registered with email: ${error.keyValue.email}`,
      );

    this.logger.error(error);
    throw new InternalServerErrorException('Something went wrong!');
  }
}
