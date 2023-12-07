export const notificationJSONSchema = {
  type: 'object',
  required: [
    'id',
    'isActive',
    'createdAt',
    'updatedAt',
    'name',
    'url',
    'source',
    'dismissable',
  ],
  properties: {
    id: {
      type: 'string',
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
    url: {
      type: 'string',
    },
    source: {
      type: 'string',
    },
    dismissable: {
      type: 'boolean',
    },
  },
};
