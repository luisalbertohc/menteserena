# This Dockerfile is for development use only
FROM node:14.17.0-alpine3.12

RUN apk add --no-cache bash

WORKDIR /app
COPY . /app

COPY package.json yarn.lock /app/
# Install deps 
RUN cd /app &&  npm install 

ADD .env /app/.aptible.env
RUN set -a && . /app/.aptible.env && npm run build

EXPOSE 3000

ENTRYPOINT [ "npm", "run", "start" ]
#CMD ["yarn", "start"]