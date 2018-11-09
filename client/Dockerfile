FROM node:10

WORKDIR /app
ADD src ./src
ADD public ./public
ADD package.json .
ADD yarn.lock .

RUN yarn install
