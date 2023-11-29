import { IResponseBodyData, ResponseBodyDto } from '@/libs/http';
import { HttpStatus } from '@nestjs/common';
import { JSONSchemaType } from 'ajv';
import _ from 'lodash';

export const responseBodyJSONSchema: JSONSchemaType<ResponseBodyDto> = {
  type: 'object',
  required: ['statusCode', 'message', 'timestamp'],
  properties: {
    statusCode: {
      type: 'number',
      enum: Object.values(HttpStatus) as HttpStatus[],
    },
    message: {
      type: 'string',
    },
    error: {
      type: 'string',
      nullable: true,
    },
    data: {
      type: 'object',
      nullable: true,
    },
    timestamp: {
      type: 'number',
    },
    requestId: {
      type: 'string',
      nullable: true,
    },
  },
};

export function buildResponseBodySchema<T = IResponseBodyData>(
  dataSchema: T,
): JSONSchemaType<ResponseBodyDto<T>> {
  const schema = _.cloneDeep(responseBodyJSONSchema);
  schema.properties.data = dataSchema;
  return schema;
}
