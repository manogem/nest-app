FROM node:16.14.0-alpine3.14 AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install --only=development

COPY . .
