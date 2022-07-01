FROM node:17-slim

WORKDIR /usr/app
COPY ./ /usr/app

RUN npm install

CMD npm start