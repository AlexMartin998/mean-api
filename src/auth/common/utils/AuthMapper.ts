import { AuthResponseDto } from 'src/auth/dto';
import { User } from 'src/users/entities/user.entity';

export class AuthMapper {
  public static mapToAuthResponseDto(
    token: string,
    user: User,
  ): AuthResponseDto {
    return {
      token,
      user,
    };
  }
}
