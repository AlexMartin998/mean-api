import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

import { User } from 'src/users/entities/user.entity';
import { UserRepository } from 'src/users/repositories/users.repository';
import { LoginDto, RegisterDto } from './dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger('ProductsService');

  constructor(private readonly userRepository: UserRepository) {}

  async register(registerDto: RegisterDto): Promise<User> {
    try {
      return await this.userRepository.create(registerDto);
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  login(loginUserDto: LoginDto) {
    console.log(loginUserDto);
  }

  private handleExceptions(error) {
    // Lo hacemos asi para EVITAR consultar la DB para verificar si existe tanto el name y el no
    // se q solo el email es unique, othewise it should be more generic
    if (+error.code === 11000)
      throw new BadRequestException(
        `User already registered with email: ${error.keyValue.email}`,
      );

    this.logger.error(error);
    throw new InternalServerErrorException('Something went wrong!');
  }
}
