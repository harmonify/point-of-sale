FROM node:18-alpine AS base
RUN apk add \
  chromium \
  openssl
WORKDIR /app
COPY . .
ENV NODE_ENV=dev \
  APP_PORT=${APP_PORT:-8080} \
  APP_PREFIX=${APP_PREFIX} \
  APP_NAME=${APP_NAME:-WhatsappX} \
  API_URL=${API_URL:-http://localhost} \
  ALLOWED_ORIGINS=${ALLOWED_ORIGINS} \
  MONGOOSE_URI=${MONGOOSE_URI:-mongodb://localhost:27017} \
  MONGOOSE_DATABASE=${MONGOOSE_DATABASE:-whatsappx} \
  MONGOOSE_USERNAME=${MONGOOSE_USERNAME} \
  MONGOOSE_PASSWORD=${MONGOOSE_PASSWORD} \
  SWAGGER_USER=${SWAGGER_USER:-admin} \
  SWAGGER_PASSWORD=${SWAGGER_PASSWORD:-admin} \
  DEFAULT_USER_USERNAME=${DEFAULT_USER_USERNAME:-admin} \
  DEFAULT_USER_NAME=${DEFAULT_USER_NAME:-Admin} \
  DEFAULT_USER_PASSWORD=${DEFAULT_USER_PASSWORD} \
  JWT_ACCESS_EXPIRY=${JWT_ACCESS_EXPIRY:-86400} \
  JWT_REFRESH_EXPIRY=${JWT_REFRESH_EXPIRY:-2592000} \
  TOKEN_TYPE=${TOKEN_TYPE:-Bearer} \
  THROTTLE_LIMIT=${THROTTLE_LIMIT:-12} \
  THROTTLE_TTL=${THROTTLE_TTL:-10}
RUN openssl rand -hex 64 > /etc/jwt_secret_env
EXPOSE $APP_PORT

FROM base AS dev
ENV NODE_ENV=dev
RUN npm install
CMD ["sh", "-c", "export JWT_SECRET=$( cat /etc/jwt_secret_env ); npm run migration:up; npm run start:dev"]

FROM base AS build
RUN npm install
RUN npm run build

FROM build AS prod
ENV NODE_ENV=prod
RUN npm install --omit=dev
CMD ["sh", "-c", "export JWT_SECRET=$( cat /etc/jwt_secret_env ); npm run migration:up; npm run start:prod"]
