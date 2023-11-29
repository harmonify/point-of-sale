export const providerJSONSchema = {
  title: 'Customer Schema V1',
  type: 'object',
  required: ['id', 'isActive', 'createdAt', 'updatedAt', 'name'],
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
    name: {
      type: 'string',
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
