FROM node:11.7.0

ENV FOOTER_TYPE=WITH_ALPHABET
ENV APPLICATION_NAME=personopplysninger
ENV CONTEXT_PATH=person/personopplysninger
ENV APPD_ENABLED=true

COPY ./build /app
