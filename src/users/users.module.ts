import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { User, UserSchema } from './entities/user.entity';
import { UserRepository } from './repositories/users.repository';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [],
  providers: [UsersService, UserRepository], // todos los @Injectable se declaran como providers
  exports: [MongooseModule, UsersService, UserRepository], // use module entities in another module
})
export class UsersModule {}
