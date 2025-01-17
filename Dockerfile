FROM node:latest

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install --force

COPY . .

RUN npm run build

CMD [ "npm", "run", "start:dev" ]