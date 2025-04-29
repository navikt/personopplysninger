FROM node:22-bookworm-slim
# RUN apk add --no-cache bash
ENV NODE_ENV production

WORKDIR usr/src/app
COPY server server/
COPY build build/

WORKDIR server

CMD ["node", "./server.js"]

EXPOSE 8080
