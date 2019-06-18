FROM node:11.7.0

WORKDIR usr/src/app
COPY server server/
COPY src src/
COPY public public/
COPY *.json ./

RUN npm install && npm run build
ENV NODE_ENV production

EXPOSE 8080

CMD ["node", "./server/server.js"]
