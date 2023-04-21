FROM node:latest

WORKDIR /usr/src/app/room_service

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "node", "room_service.js" ]