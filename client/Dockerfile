FROM node:8

WORKDIR /app
ADD src .
ADD public .
ADD package.json .
ADD yarn.lock .

RUN yarn install
