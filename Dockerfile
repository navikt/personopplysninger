FROM node:11-alpine
# RUN apk add --no-cache bash
ENV NODE_ENV production

COPY . usr/src/app

WORKDIR usr/src/app
RUN npm ci
RUN npm build

WORKDIR server
RUN npm ci

CMD ["node", "./server.js"]

EXPOSE 8080
