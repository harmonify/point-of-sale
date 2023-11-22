import { HashService } from '@common/helpers';
import { InvalidCurrentPasswordException } from '@common/http/exceptions';
import { UserEntity } from '@database/entities';
import { BaseRepository } from '@libs/crud/base.repository';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, NotFoundException } from '@nestjs/common';

import {
  ChangePasswordRequestDto,
  CreateUserRequestDto,
  UpdateUserRequestDto,
  UserResponseDto,
} from './dtos';
import { UserMapper } from './user.mapper';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: BaseRepository<UserEntity>,
  ) {}

  async findAll(pagination: any): Promise<any> {
    // const qb = this.usersRepository.createQueryBuilder(UserService.name);

    // const overridePaginationDto: Partial<any> = {
    //   fields: ['uuid', 'name', 'email', 'isActive', 'isBlocked', 'createdAt'],
    //   type: PaginationType.OFFSET_V2,
    //   withDeleted: false,
    // };

    return { data: null, meta: null } as any;
    // return await this.usersRepository.findAndPaginate({
    //   qb,
    //   pageOptionsDto: {
    //     ...pagination,
    //     ...overridePaginationDto,
    //     alias: UserService.name,
    //   },
    // });
  }

  async findOne(id: string): Promise<UserResponseDto> {
    const entity = await this.usersRepository.findOneOrFail({ id: id });
    return UserMapper.toDtoWithRelations(entity);
  }

  async create(userDto: CreateUserRequestDto): Promise<UserResponseDto> {
    const entity = await this.usersRepository.createAndFlush(
      UserMapper.toCreateEntity(userDto),
    );
    return UserMapper.toDtoWithRelations(entity);
  }

  async update(
    id: string,
    userDto: UpdateUserRequestDto,
  ): Promise<UserResponseDto> {
    const entity = await this.usersRepository.findAndUpdate(
      { id: id },
      UserMapper.toUpdateEntity({ id: id }, userDto),
    );
    return UserMapper.toDtoWithRelations(entity);
  }

  /**
   * Change user password
   * @param changePassword {ChangePasswordRequestDto}
   * @param user {string}
   * @returns {Promise<UserResponseDto>}
   */
  async changePassword(
    changePassword: ChangePasswordRequestDto,
    userId: string,
  ): Promise<UserResponseDto> {
    const { currentPassword, newPassword } = changePassword;

    const entity = await this.usersRepository.findOne({ id: userId });

    if (!entity) {
      throw new NotFoundException();
    }

    const passwordMatch = await HashService.compare(
      currentPassword,
      entity.password,
    );

    if (!passwordMatch) {
      throw new InvalidCurrentPasswordException();
    }

    await this.usersRepository.nativeUpdate(
      { id: userId },
      { password: newPassword },
    );
    return UserMapper.toDto(entity);
  }

  async delete(id: string): Promise<UserResponseDto> {
    return UserMapper.toDto(
      await this.usersRepository.findAndSoftRemove({ id: id }),
    );
  }
}
