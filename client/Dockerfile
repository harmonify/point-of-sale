FROM node:18-alpine AS prod
WORKDIR /app
COPY package.json ./package.json
COPY yarn.lock ./yarn.lock
RUN yarn install
ARG VITE_PUBLIC_URL
ARG VITE_API_BASE_URL
ARG VITE_APP_NAME
ARG VITE_APP_ADDRESS
ARG VITE_APP_CITY
ARG VITE_APP_PHONE
ARG VITE_APP_ZIP_CODE
ENV VITE_APP_ENV=production
RUN echo $VITE_API_BASE_URL
EXPOSE 3000
COPY . .
RUN yarn build:unsafe
CMD ["yarn", "preview"]
