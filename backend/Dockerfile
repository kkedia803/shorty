FROM node:22-alpine

WORKDIR /src

COPY package* ./

RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 3000

CMD [ "npm", "start" ]