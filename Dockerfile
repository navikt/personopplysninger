FROM node:20-bullseye-slim
# RUN apk add --no-cache bash
ENV NODE_ENV production

WORKDIR usr/src/app
COPY build build/
COPY server/node_modules build/server/node_modules

CMD ["node", "./build/server/server.js"]

EXPOSE 8080
