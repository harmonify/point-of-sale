export const userJSONSchema = {
  type: 'object',
  required: [
    'id',
    'isActive',
    'createdAt',
    'updatedAt',
    'name',
    'email',
    'phoneNumber',
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
      nullable: true,
    },
    updatedById: {
      type: 'number',
      nullable: true,
    },
    deletedById: {
      type: 'number',
      nullable: true,
    },
    name: {
      type: 'string',
    },
    email: {
      type: 'string',
    },
    phoneNumber: {
      type: 'string',
    },
    blockReason: {
      type: 'string',
      nullable: true,
    },
  },
};
