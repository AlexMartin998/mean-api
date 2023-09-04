import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserRepository } from 'src/users/repositories/users.repository';
import { JwtPayload } from './common/interfaces';
import { AuthMapper } from './common/utils';
import { AuthResponseDto, LoginDto, RegisterDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<AuthResponseDto> {
    const user = await this.userRepository.create(registerDto);
    const token = await this.getJwt({ id: user.id });

    return AuthMapper.mapToAuthResponseDto(token, user);
  }

  async login(loginUserDto: LoginDto): Promise<AuthResponseDto> {
    const user = await this.userRepository.findOneAndComparePassword(
      loginUserDto,
    );

    if (!user)
      throw new UnauthorizedException(
        'There was a problem logging in. Check your email and password or create an account',
      );

    const token = await this.getJwt({ id: user.id });

    return AuthMapper.mapToAuthResponseDto(token, user);
  }

  private async getJwt(payload: JwtPayload): Promise<string> {
    return this.jwtService.signAsync(payload);
  }
}
