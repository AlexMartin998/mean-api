import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { HydratedDocument } from 'mongoose';

import { AuthConstants } from 'src/common/constants';

export type UserDocument = HydratedDocument<User>;

@Schema() // propio de mongo
export class User {
  // no lo coloco como @prop
  id?: string; // <-  Me lo da MongoDB en auto

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

const UserSchema = SchemaFactory.createForClass(User);

// Hooks (middleware)
UserSchema.pre('save', async function (next) {
  // If the pass is already hashed, it don't re-hashet it
  if (!this.isModified('password')) return next();

  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;

  next();
});

UserSchema.methods.comparePassword = function (password: string) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.toJSON = function () {
  const user = this.toObject();
  user.id = user._id;

  delete user.password;
  delete user._id;
  delete user.__v;

  return user;
};

export { UserSchema };
