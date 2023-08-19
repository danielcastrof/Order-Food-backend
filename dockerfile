FROM node:16.14.0

RUN apt-get update && apt-get install -y curl
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update && apt-get install -y yarn

WORKDIR /usr/src/api

COPY package*.json ./

COPY . .
COPY ./.env ./.env

RUN yarn

RUN yarn run build

EXPOSE 8000

CMD ["yarn", "start"]