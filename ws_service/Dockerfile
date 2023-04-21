FROM node:latest

WORKDIR /usr/src/app/ws_service

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3002

CMD [ "node", "ws_service.js" ]