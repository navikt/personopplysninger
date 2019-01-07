FROM node:carbon

WORKDIR /usr/src/personopplysninger

COPY ./ ./

EXPOSE 8080

CMD ["npm", "run", "server"]
