import { createMock } from '@golevelup/ts-jest';
import { EntityManager } from '@mikro-orm/core';
import { Test } from '@nestjs/testing';
import { IsUniqueConstraint } from './is-unique.validator';
import type { IsUniqueValidationContext } from './is-unique.validator';

import { UserEntity } from '@database/entities/user.entity';

describe('IsUnique', () => {
  let isUnique: IsUniqueConstraint;
  const mockEm = createMock<EntityManager>();
  const username = 'tester';

  const validatorArguments: IsUniqueValidationContext = {
    object: { username },
    constraints: [() => UserEntity, 'username' as never],
    value: username,
    targetName: '',
    property: 'username',
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        IsUniqueConstraint,
        { provide: EntityManager, useValue: mockEm },
      ],
    }).compile();

    isUnique = module.get<IsUniqueConstraint>(IsUniqueConstraint);
  });

  it('should pass if there are no duplicates', async () => {
    mockEm.count.mockResolvedValue(0);
    const result = await isUnique.validate<UserEntity, 'username'>(
      username,
      validatorArguments,
    );

    expect(result).toBeTruthy();
    expect(mockEm.count).toBeCalledWith(UserEntity, { username });
  });

  it('should fail if there are  duplicates', async () => {
    mockEm.count.mockResolvedValue(1);
    const result = await isUnique.validate<UserEntity, 'username'>(
      username,
      validatorArguments,
    );

    expect(result).toBeFalsy();
    expect(mockEm.count).toBeCalledWith(UserEntity, { username });
  });
});
