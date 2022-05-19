# This Dockerfile is for development use only
FROM node:14.17.0-alpine3.12

RUN apk add --no-cache bash
ENV PORT=3000
WORKDIR /app

COPY . /app
RUN yarn

COPY package.json yarn.lock /app/
ADD .env /app/.aptible.env

RUN yarn build
EXPOSE 3000
CMD ["yarn", "start"]