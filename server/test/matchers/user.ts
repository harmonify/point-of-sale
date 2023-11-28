import { UserResponseDto } from '@/modules/user';

export function expectUser(user: UserResponseDto) {
  expect(user).toBeDefined();
  expect(user.id).toBeDefined();
  expect(user.id).toBeNumber();
  expect(user.email).toBeDefined();
  expect(user.email).toBeString();
  expect(user.name).toBeDefined();
  expect(user.name).toBeString();
  expect(user.phoneNumber).toBeDefined();
  expect(user.phoneNumber).toBeString();
  expect(user.blockReason).toBeDefined();
  expect(
    user.blockReason === null || typeof user.blockReason === 'string',
    'null or string',
  ).toBeTrue();
  expect(user.isActive).toBeDefined();
  expect(user.isActive).toBeBoolean();
  expect(user.createdAt).toBeDefined();
  expect(user.createdAt).toBeString();
  expect(user.updatedAt).toBeDefined();
  expect(user.updatedAt).toBeString();
  expect(user.deletedAt).toBeDefined();
  expect(
    user.deletedAt === null || typeof user.deletedAt === 'string',
    'null or string',
  ).toBeTrue();
}
