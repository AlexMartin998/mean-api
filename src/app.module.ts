import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth/auth.module';
import { EnvConfiguration } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      isGlobal: true, //Con esto evitamos tener q importar el 'ConfigModule' en c/module q utilize EnvV
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),

    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
