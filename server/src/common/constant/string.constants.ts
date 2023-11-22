import { capitalize } from 'helper-fns';
import packageJson from '../../../package.json';

export const REQUEST_ID_TOKEN_HEADER = 'x-request-id';
export const VERSION_VALIDATION_MESSAGE =
  'Version must start with "v" followed by a number.';

// swagger constants
export const APP_NAME = packageJson.name;
export const SWAGGER_API_CURRENT_VERSION = packageJson.version;
export const SWAGGER_DESCRIPTION = packageJson.description;
export const SWAGGER_TITLE = `${capitalize(APP_NAME)} API Documentation`;

export const SWAGGER_API_ENDPOINT = 'doc';

// available values constants
export const APP_ENVIRONMENTS = ['dev', 'staging', 'test', 'prod'];
