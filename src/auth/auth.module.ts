import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { UsersModule } from 'src/users/users.module';

import { AuthService } from './auth.service';

import { Envs } from 'src/common/constants';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>(Envs.JWT_SECRET),
        signOptions: { expiresIn: '3d' },
      }),
    }),

    UsersModule,
  ],

  controllers: [AuthController],

  providers: [AuthService],

  exports: [JwtModule],
})
export class AuthModule {}
