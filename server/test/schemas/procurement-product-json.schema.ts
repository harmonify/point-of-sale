export const procurementProductJSONSchema = {
  title: 'Procurement Product Schema V1',
  type: 'object',
  required: [
    'id',
    'isActive',
    'createdAt',
    'updatedAt',
    'createdById',
    'updatedById',
    'productUnitId',
    'price',
    'quantity',
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
    productUnitId: {
      type: 'number',
    },
    price: {
      type: 'number',
    },
    quantity: {
      type: 'number',
    },
  },
};
