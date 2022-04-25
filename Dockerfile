# This Dockerfile is for development use only
FROM node:14.17.0-alpine3.12

RUN apk add --no-cache bash

WORKDIR /app

COPY package.json yarn.lock /app/
RUN yarn

COPY . /app

EXPOSE 3000

CMD ["yarn", "dev"]