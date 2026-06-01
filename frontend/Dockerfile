FROM node:22-alpine

WORKDIR /src 

COPY package* ./

RUN npm install

COPY . .

ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

RUN npm run build

EXPOSE 4173

CMD [ "npm", "run", "serve" ]