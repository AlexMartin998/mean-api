import { Controller, Get, Param, Request, UseGuards } from '@nestjs/common';

import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string, @Request() req: Request) {
    const user = req['user']; // after guard
    console.log(user);

    // return this.usersService.findOne(id);
  }
}
