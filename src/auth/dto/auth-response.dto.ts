import { User } from 'src/users/entities/user.entity';

export class AuthResponseDto {
  token: string;
  user: User;
}
