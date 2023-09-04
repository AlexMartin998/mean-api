import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { User, UserSchema } from './entities/user.entity';
import { UserRepository } from './repositories/users.repository';

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
  providers: [UserRepository], // todos los @Injectable se declaran como providers
  exports: [MongooseModule, UserRepository], // use module entities in another module
})
export class UsersModule {}
