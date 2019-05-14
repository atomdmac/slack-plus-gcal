FROM node:11
WORKDIR /home/node/app
COPY package.json /home/node/app
COPY yarn.lock /home/node/app
COPY entrypoint.sh /home/node/app
