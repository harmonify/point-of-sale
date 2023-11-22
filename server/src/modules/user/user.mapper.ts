import { UserEntity } from '@database/entities/user.entity';
import { EntityData, serialize, wrap } from '@mikro-orm/core';
import _ from 'lodash';

import {
  CreateUserRequestDto,
  UpdateUserRequestDto,
  UserResponseDto,
} from './dtos';

export class UserMapper {
  static toDto(entity: UserEntity): UserResponseDto {
    return serialize(entity, {
      exclude: [], // skip property of some relation
      forceObject: true, // not populated or not initialized relations will result in object, e.g. `{ author: { id: 1 } }`
      skipNull: false, // properties with `null` value should still be part of the result
    }) as UserResponseDto;
  }

  static async toDtoWithRelations(
    entity: UserEntity,
  ): Promise<Required<UserResponseDto>> {
    return UserMapper.toDto(entity) as Required<UserResponseDto>;
  }

  static toCreateEntity(dto: CreateUserRequestDto): UserEntity {
    const entity = new UserEntity({
      name: dto.name,
      username: dto.username,
      email: dto.email,
      phoneNumber: dto.phoneNumber,
      password: dto.password,
    });
    return entity;
  }

  static toUpdateEntity(
    entity: EntityData<UserEntity>,
    dto: UpdateUserRequestDto,
  ): EntityData<UserEntity> {
    return wrap(entity).assign(
      _.omitBy(
        {
          name: dto.name,
          username: dto.username,
          email: dto.email,
          phoneNumber: dto.phoneNumber || entity.phoneNumber || undefined,
          isActive: dto.isActive !== undefined ? dto.isActive : entity.isActive,
          isBlocked:
            dto.isBlocked !== undefined ? dto.isBlocked : entity.isBlocked,
        },
        _.isUndefined,
      ),
    );
  }
}
