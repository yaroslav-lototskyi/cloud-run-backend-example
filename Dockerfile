FROM node:17-slim

WORKDIR /app
COPY . .

RUN npm install

CMD npm run migration:db && npm start