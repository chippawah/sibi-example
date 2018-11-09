FROM node:10

WORKDIR /app
ADD src ./src
ADD package.json .
ADD yarn.lock .
ADD .babelrc .

RUN yarn install ; yarn build
