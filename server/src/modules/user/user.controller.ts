import { ApiGlobalResponse } from '@common/decorators';
import { UserEntity } from '@database/index';
import { CurrentUser, SkipAuth, TOKEN_NAME } from '@modules/auth';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import {
  ChangePasswordRequestDto,
  CreateUserRequestDto,
  UpdateUserRequestDto,
  UserResponseDto,
} from './dtos';
import { UserService } from './user.service';

@ApiTags('Users')
@ApiBearerAuth(TOKEN_NAME)
@Controller({
  path: 'users',
  version: '1',
})
export class UserController {
  constructor(private usersService: UserService) {}

  @ApiOperation({ description: 'Get a paginated user list' })
  @ApiQuery({
    name: 'search',
    type: 'string',
    required: false,
    example: 'admin',
  })
  @Get()
  findAll() {
    return this.usersService.findAll(null);
  }

  @ApiOperation({ description: 'Get user by id' })
  @ApiGlobalResponse(UserResponseDto)
  @Get('/:id')
  findOne(@Param('id') id: string): Promise<UserResponseDto> {
    return this.usersService.findOne(id);
  }

  @ApiOperation({ description: 'Create new user' })
  @ApiGlobalResponse(UserResponseDto)
  @ApiConflictResponse({ description: 'User already exists' })
  @Post()
  create(
    @Body(ValidationPipe) UserDto: CreateUserRequestDto,
  ): Promise<UserResponseDto> {
    return this.usersService.create(UserDto);
  }

  @ApiOperation({ description: 'Update user by id' })
  @ApiGlobalResponse(UserResponseDto)
  @ApiConflictResponse({ description: 'User already exists' })
  @Put('/:id')
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) UserDto: UpdateUserRequestDto,
  ): Promise<UserResponseDto> {
    return this.usersService.update(id, UserDto);
  }

  @ApiOperation({ description: 'Change user password' })
  @ApiGlobalResponse(UserResponseDto)
  @Post('/change/password')
  changePassword(
    @Body(ValidationPipe) changePassword: ChangePasswordRequestDto,
    @CurrentUser() user: Required<UserEntity>,
  ): Promise<UserResponseDto> {
    return this.usersService.changePassword(changePassword, user.id);
  }

  @ApiOperation({ description: 'Delete user by id' })
  @ApiGlobalResponse(UserResponseDto)
  @Delete('/:id')
  delete(@Param('id') id: string): Promise<UserResponseDto> {
    return this.usersService.delete(id);
  }
}
