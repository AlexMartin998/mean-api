import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from 'src/users/users.service';
import { JwtPayload } from './common/interfaces';
import { AuthMapper } from './common/utils';
import { AuthResponseDto, LoginDto, RegisterDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<AuthResponseDto> {
    const user = await this.userService.create(registerDto);
    const token = await this.getJwt({ id: user.id });

    return AuthMapper.mapToAuthResponseDto(token, user);
  }

  async login(loginUserDto: LoginDto): Promise<AuthResponseDto> {
    const { email, password } = loginUserDto;

    const user = await this.userService.findOneByEmail(email);
    const matchPassword: boolean = (user as any)?.comparePassword(password);

    if (!user?.email || !matchPassword)
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
