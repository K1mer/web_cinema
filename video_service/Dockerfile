FROM node:latest

WORKDIR /usr/src/app/video_server

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3003

CMD [ "node", "video_server.js" ]