import packageJson from '../../../package.json';

export const VERSION_VALIDATION_MESSAGE =
  'Version must start with "v" followed by a number.';

// swagger constants
export const APP_NAME = packageJson.name;
export const SWAGGER_API_CURRENT_VERSION = packageJson.version;
export const SWAGGER_DESCRIPTION = packageJson.description;
export const SWAGGER_TITLE = `${APP_NAME} API Documentation`;

export const SWAGGER_API_ENDPOINT = 'doc';

// available values constants
export const APP_ENVIRONMENTS: NodeJS.ProcessEnv['NODE_ENV'][] = [
  'development',
  'staging',
  'test',
  'production',
];
