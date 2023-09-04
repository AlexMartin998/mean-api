import { Injectable } from '@nestjs/common';

import { LoginDto, RegisterDto } from './dto';

@Injectable()
export class AuthService {
  register(registerDto: RegisterDto) {
    console.log(registerDto);
  }

  login(loginUserDto: LoginDto) {
    console.log(loginUserDto);
  }
}
