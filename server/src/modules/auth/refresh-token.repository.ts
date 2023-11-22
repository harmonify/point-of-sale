import { Injectable } from '@nestjs/common';
import { UserEntity, RefreshTokenEntity } from '@database/entities';
import { BaseRepository } from '@/libs/crud';

@Injectable()
export class RefreshTokenRepository extends BaseRepository<RefreshTokenEntity> {
  /**
   * It creates a new refresh token for the given user and expiration time
   * @param user - The user that the token is being created for.
   * @param ttl - number - the time to live of the token in seconds
   * @returns A refresh token
   */
  async createRefreshToken(
    user: UserEntity,
    expiresIn: number,
  ): Promise<RefreshTokenEntity> {
    const expiration = new Date();

    // the input is treated as millis so *1000 is necessary
    const ttlSeconds = expiresIn * 1000; // seconds

    expiration.setTime(expiration.getTime() + ttlSeconds);

    const token = this.createAndFlush({
      user: user,
      expiresIn: expiration,
    });
    return token;
  }

  /**
   * It finds a refresh token by its id and returns it as an observable
   * @param id - The id of the token to be found.
   * @returns Promise<RefreshTokenEntity>
   */
  findTokenById(id: string): Promise<RefreshTokenEntity | null> {
    return this.findOne({
      id: id,
      isActive: true,
      deletedAt: null,
    });
  }

  /**
   * It finds a refresh token by its uuid and returns it as an observable
   * @param uuid - The uuid of the token to be found.
   * @returns Promise<RefreshTokenEntity>
   */
  findTokenByUUID(uuid: string): Promise<RefreshTokenEntity | null> {
    return this.findOne({
      uuid,
      isActive: true,
      deletedAt: null,
    });
  }

  /**
   * It deletes all refresh tokens for a given user
   * @param user - UserEntity - The user object that we want to delete the tokens for.
   * @returns A boolean value.
   */
  async deleteTokensForUser(user: UserEntity): Promise<boolean> {
    await this.nativeUpdate({ user }, { isActive: false });
    return true;
  }

  /**
   * It deletes a refresh token by setting its `isActive` property to `false`
   * @param user - UserEntity - the user object that is currently logged in
   * @param tokenId - The ID of the token to be deleted.
   * @returns A boolean value.
   */
  async deleteToken(
    user: UserEntity,
    tokenId: RefreshTokenEntity['id'],
  ): Promise<boolean> {
    await this.nativeUpdate({ user, id: tokenId }, { isActive: false });
    return true;
  }
}
