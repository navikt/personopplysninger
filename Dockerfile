FROM node:11-alpine
# RUN apk add --no-cache bash

COPY . usr/src/app
WORKDIR usr/src/app
RUN npm ci
RUN npm run build

WORKDIR server
RUN npm ci

ENV NODE_ENV production
CMD ["node", "./server.js"]

EXPOSE 8080
