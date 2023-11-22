import { HashService } from '@common/helpers';
import { UserEntity } from '@database/entities/user.entity';
import { BaseRepository } from '@libs/crud';
import { translate } from '@libs/i18n';
import { ChangePasswordRequestDto, UserResponseDto } from '@modules/users/dtos';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom, map, zip } from 'rxjs';

import { UserMapper } from '../../user/user.mapper';
import { AuthRequestDto, AuthResponseDto } from '../dtos';
import { TokenService } from './token.service';
import { InjectRepository } from '@mikro-orm/nestjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: BaseRepository<UserEntity>,
    private readonly configService: ConfigService<Configs, true>,
    private readonly tokenService: TokenService,
  ) {}

  /**
   * We validate the user, if the user is valid, we generate an access token and a refresh token
   * @param loginDto - UserLoginDto - This is the DTO that we created earlier.
   * @param isPasswordLogin - boolean - This is a boolean value that tells the function whether
   * the user is logging in with a password or oauth
   */
  async login(loginDto: AuthRequestDto): Promise<AuthResponseDto> {
    const user = await this.userRepository.findOne({
      username: loginDto.username,
    });

    if (!user) {
      throw new ForbiddenException(
        translate('exception.itemDoesNotExist', {
          args: { item: 'Account' },
        }),
      );
    }

    if (user.isBlocked) {
      throw new ForbiddenException(translate('exception.userBlocked'));
    }

    if (!user.isActive) {
      throw new ForbiddenException(translate('exception.inactiveUser'));
    }

    const userDto = await UserMapper.toDtoWithRelations(user);

    return lastValueFrom(
      zip(
        this.tokenService.generateAccessToken(user),
        this.tokenService.generateRefreshToken(user),
      ).pipe(
        map(([accessToken, refreshToken]) => ({
          user: userDto,
          tokenType: this.configService.get('jwt.tokenType', { infer: true }),
          accessToken,
          refreshToken,
        })),
      ),
    );
  }

  /**
   * It takes a user and a DTO, then it checks if the current password is valid, if it is, it updates the
   * password and returns the user
   * @param dto - ChangePasswordDto - This is the DTO that we created earlier.
   * @param user - User - The user object that is currently logged in.
   */
  async changePassword(
    dto: ChangePasswordRequestDto,
    user: UserEntity,
  ): Promise<UserResponseDto> {
    const { newPassword, currentPassword } = dto;

    const userDetails = await this.userRepository.findOneOrFail({
      _id: user._id,
    });

    await HashService.compare(currentPassword, userDetails.password);

    const result = this.userRepository.assign(userDetails, {
      password: newPassword,
    });

    this.userRepository.getEntityManager().persistAndFlush(result);

    return UserMapper.toDto(result);
  }

  /**
   * It deletes all refresh tokens for a given user
   * @param user - User - The user object that you want to logout from.
   */
  async logoutFromAll(user: UserEntity): Promise<UserResponseDto> {
    await this.tokenService.deleteRefreshTokenForUser(user);
    return UserMapper.toDto(user);
  }

  /**
   * We decode the refresh token, then delete the refresh token from the database
   * @param user - The user object that was returned from the login method.
   * @param refreshToken - The refresh token that was sent to the client.
   */
  async logout(
    user: UserEntity,
    refreshToken: string,
  ): Promise<UserResponseDto> {
    const payload = await this.tokenService.decodeRefreshToken(refreshToken);
    await this.tokenService.deleteRefreshToken(user, payload);
    return UserMapper.toDto(user);
  }
}
