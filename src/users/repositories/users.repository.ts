import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { LoginDto, RegisterDto } from 'src/auth/dto';
import { User, UserDocument } from '../entities/user.entity';

@Injectable()
export class UserRepository {
  private readonly logger = new Logger('UserRepository');

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(registerDto: RegisterDto): Promise<UserDocument> {
    try {
      const user = new this.userModel(registerDto);

      return await user.save();
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findOne(id: number): Promise<User> {
    return this.userModel.findById(id);
  }

  async findOneAndComparePassword(loginDto: LoginDto): Promise<UserDocument> {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ email });
    const matchPassword: boolean = (user as any)?.comparePassword(password);

    if (!user?.email || !matchPassword) return null;

    return user;
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
