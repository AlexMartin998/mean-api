import { Injectable } from '@nestjs/common';

import { User } from 'src/users/entities/user.entity';
import { UserRepository } from 'src/users/repositories/users.repository';
import { LoginDto, RegisterDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async register(registerDto: RegisterDto): Promise<User> {
    return await this.userRepository.create(registerDto);
  }

  login(loginUserDto: LoginDto) {
    console.log(loginUserDto);
  }
}
