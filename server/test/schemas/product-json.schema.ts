import { productUnitJSONSchema } from './product-unit-json.schema';

export const productJSONSchema = {
  title: 'Product Schema V1',
  type: 'object',
  required: [
    'id',
    'isActive',
    'createdAt',
    'updatedAt',
    'createdById',
    'updatedById',
    'name',
    'categoryId',
    'productUnits',
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
    description: {
      type: 'string',
      nullable: true,
    },
    barcode: {
      type: 'string',
      nullable: true,
    },
    barcodeType: {
      type: 'string',
      nullable: true,
    },
    categoryId: {
      type: 'number',
    },
    productUnits: {
      type: 'array',
      items: productUnitJSONSchema,
    },
  },
};
