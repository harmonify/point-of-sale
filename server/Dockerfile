FROM node:18-alpine AS base
WORKDIR /app
COPY . .
ENV NODE_ENV=dev \
  APP_PORT=${APP_PORT:-8080} \
  APP_PREFIX=${APP_PREFIX} \
  APP_NAME=${APP_NAME:-WhatsappX} \
  API_URL=${API_URL:-http://localhost} \
  ALLOWED_ORIGINS=${ALLOWED_ORIGINS} \
  DATABASE_URL=${DATABASE_URL:-mysql://0.0.0.0:3636/point-of-sale} \
  SWAGGER_USER=${SWAGGER_USER:-admin} \
  SWAGGER_PASSWORD=${SWAGGER_PASSWORD:-admin} \
  JWT_SECRET=${JWT_SECRET} \
  JWT_ACCESS_EXPIRY=${JWT_ACCESS_EXPIRY:-86400} \
  JWT_REFRESH_EXPIRY=${JWT_REFRESH_EXPIRY:-2592000} \
  TOKEN_TYPE=${TOKEN_TYPE:-Bearer} \
  THROTTLE_LIMIT=${THROTTLE_LIMIT:-12} \
  THROTTLE_TTL=${THROTTLE_TTL:-10}
EXPOSE $APP_PORT

FROM base AS dev
ENV NODE_ENV=dev
RUN yarn install
CMD ["sh", "-c", "yarn run migration:deploy && yarn run start:dev"]

FROM base AS build
RUN yarn install
RUN yarn run build

FROM build AS prod
ENV NODE_ENV=prod
RUN yarn install --production
CMD ["sh", "-c", "yarn run migration:deploy && yarn run start:prod"]
