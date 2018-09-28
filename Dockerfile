FROM docker.adeo.no:5000/pus/node

WORKDIR /usr/src/personopplysninger

COPY ./ ./

EXPOSE 8080

CMD ["npm", "run", "server"]