const appBaseUrl = process.env.API_URL || 'localhost';
const appPort = process.env.APP_PORT || '8080';
export const appUrl = `${appBaseUrl}:${appPort}`;
