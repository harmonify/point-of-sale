FROM node:18-alpine AS base
WORKDIR /app
COPY package.json ./package.json
COPY yarn.lock ./yarn.lock
RUN yarn install
ENV VITE_APP_ENV=${VITE_APP_ENV} \
  VITE_PUBLIC_URL=${VITE_PUBLIC_URL} \
  VITE_API_BASE_URL=${VITE_API_BASE_URL} \
  VITE_APP_NAME=${VITE_APP_NAME} \
  VITE_APP_ADDRESS=${VITE_APP_ADDRESS} \
  VITE_APP_CITY=${VITE_APP_CITY} \
  VITE_APP_PHONE=${VITE_APP_PHONE} \
  VITE_APP_ZIP_CODE=${VITE_APP_ZIP_CODE}
EXPOSE 3000
COPY . .

FROM base AS dev
ENV VITE_APP_ENV=development
CMD ["yarn", "start:dev"]

FROM base AS prod
ENV VITE_APP_ENV=production
RUN yarn build:unsafe
CMD ["yarn", "preview"]
