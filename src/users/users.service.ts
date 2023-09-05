import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateUserDto } from './dto';
import { UserRepository } from './repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(userDto: CreateUserDto) {
    return await this.userRepository.create(userDto);
  }

  async findOneByEmail(email: string) {
    return this.userRepository.findOneByEmail(email);
  }

  async findAll() {
    return this.userRepository.findAll();
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne(id);
    if (!user?.email)
      throw new NotFoundException(`User not found with ID: ${id}}`);

    return user;
  }
}
