FROM node:18-alpine

WORKDIR /home/app

COPY package*.json ./
COPY .env.docker .env

RUN npm install

RUN npm install -g tsx

COPY . .

EXPOSE 3333

CMD ["npm","run", "dev"]