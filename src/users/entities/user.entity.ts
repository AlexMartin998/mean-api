import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { AuthConstants } from 'src/common/constants';

export type UserDocument = HydratedDocument<User>;

@Schema() // propio de mongo
export class User {
  // id: sting  <-  Me lo da MongoDB en auto

  @Prop({ required: true })
  name: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ minlength: 3, required: true }) // minlength hashed
  password: string;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({
    type: [String],
    enum: [AuthConstants.USER_ROLE, AuthConstants.USER_ROLE],
    default: [AuthConstants.USER_ROLE],
  })
  roles: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
