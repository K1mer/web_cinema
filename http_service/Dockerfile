FROM node:latest

WORKDIR /usr/src/app/http_server

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD [ "node", "http_server.js" ]