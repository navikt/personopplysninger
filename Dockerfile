FROM node:11-alpine

WORKDIR usr/src/app
COPY server server/
COPY build build/

ENV NODE_ENV production

WORKDIR server
RUN npm install
RUN npm start

EXPOSE 8080
