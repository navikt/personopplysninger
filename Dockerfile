FROM node:carbon

WORKDIR /usr/src/personopplysninger

COPY ./ ./

RUN npm install && npm run build

EXPOSE 8080

CMD ["npm", "run", "server"]
