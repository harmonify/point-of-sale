import { saleProductJSONSchema } from './sale-product-json.schema';

export const saleJSONSchema = {
  title: 'Sale Schema V1',
  type: 'object',
  required: [
    'id',
    'isActive',
    'createdAt',
    'updatedAt',
    'createdById',
    'updatedById',
    'name',
    'saleProducts',
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
    saleProducts: {
      type: 'array',
      items: saleProductJSONSchema,
    },
  },
};
