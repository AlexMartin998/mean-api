import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';
import { AuthGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {
  // limitacion del DI de Nest es q se Inject x Constructor con el Type de la Implementacion. No podemos tipar con 1 Interface xq no lo va a Inyectar (Awilix si nos permite esto, pero su "contra" es q debemos hacer desestructuring)
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  createUser(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginDto) {
    return this.authService.login(loginUserDto);
  }

  @UseGuards(AuthGuard)
  @Get('renew-token')
  checkAuthStatus(@Request() req: Request) {
    const user = req['user']; // after guard

    return this.authService.renewJwt(user);
  }
}
