# syntax=docker/dockerfile:1

FROM node:20.11
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["node", "server.js"]
EXPOSE 3000
