FROM node:latest

# создание директории приложения
WORKDIR /usr/src/app/ws_service

# установка зависимостей
# символ астериск ("*") используется для того чтобы по возможности
# скопировать оба файла: package.json и package-lock.json
COPY package*.json ./

RUN npm install

RUN npm i
# Если вы создаете сборку для продакшн
# RUN npm ci —omit=dev

# копируем исходный код
COPY . .

EXPOSE 3002

CMD [ "node", "ws_service.js" ]