export const productUnitJSONSchema = {
  title: 'Product Unit Schema V1',
  type: 'object',
  required: [
    'id',
    'isActive',
    'createdAt',
    'updatedAt',
    'createdById',
    'updatedById',
    'productId',
    'unitId',
    'wholesalePrice',
    'price',
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
    productId: {
      type: 'number',
    },
    unitId: {
      type: 'number',
    },
    wholesalePrice: {
      type: 'number',
    },
    price: {
      type: 'number',
    },
    stockAlertEnabled: {
      type: 'boolean',
      nullable: true,
    },
    lowQuantity: {
      type: 'number',
      nullable: true,
    },
  },
};
