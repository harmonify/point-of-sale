export const unitJSONSchema = {
  title: 'Unit Schema V1',
  type: 'object',
  required: [
    'id',
    'isActive',
    'createdAt',
    'updatedAt',
    'name',
    'description',
    'amount',
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
    name: {
      type: 'string',
    },
    description: {
      type: 'string',
      nullable: true,
    },
    amount: {
      type: 'number',
    },
  },
};
