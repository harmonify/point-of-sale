import { Gender } from '@prisma/client';

export const customerJSONSchema = {
  title: 'Customer Schema V1',
  type: 'object',
  required: [
    'id',
    'isActive',
    'createdAt',
    'updatedAt',
    'createdById',
    'updatedById',
    'name',
    'gender',
  ],
  properties: {
    id: {
      type: 'number',
    },
    isActive: {
      type: 'boolean',
    },
    createdAt: {
      type: 'string',
    },
    updatedAt: {
      type: 'string',
    },
    deletedAt: {
      type: 'string',
      nullable: true,
    },
    createdById: {
      type: 'number',
    },
    updatedById: {
      type: 'number',
    },
    deletedById: {
      type: 'number',
      nullable: true,
    },
    name: {
      type: 'string',
    },
    gender: {
      type: 'string',
      enum: Object.values(Gender),
    },
    phoneNumber: {
      type: 'string',
      nullable: true,
    },
    email: {
      type: 'string',
      nullable: true,
    },
    description: {
      type: 'string',
      nullable: true,
    },
    address: {
      type: 'string',
      nullable: true,
    },
  },
};
