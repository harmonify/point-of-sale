FROM node:18-alpine AS dev

WORKDIR /app

EXPOSE 3000

COPY . ./

RUN yarn

CMD ["yarn", "dev"]

FROM node:18-alpine AS prod

WORKDIR /app

EXPOSE 3000

COPY . ./

RUN yarn

RUN yarn build:unsafe

CMD ["yarn", "start"]

