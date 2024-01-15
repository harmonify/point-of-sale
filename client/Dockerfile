FROM node:18-alpine AS base
WORKDIR /app
EXPOSE 3000
COPY package.json ./package.json
COPY yarn.lock ./yarn.lock
RUN yarn install
COPY . .

FROM node:18-alpine AS dev
CMD ["yarn", "start:dev"]

FROM node:18-alpine AS prod
RUN yarn build:unsafe
CMD ["yarn", "start"]
