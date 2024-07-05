FROM node:20-bullseye-slim
# RUN apk add --no-cache bash
ENV NODE_ENV prod

WORKDIR usr/src/app
COPY server server/
COPY build build/

WORKDIR server

CMD ["node", "./server.js"]

EXPOSE 8080
