FROM docker.adeo.no:5000/pus/decorator

ENV FOOTER_TYPE=WITH_ALPHABET
ENV APPLICATION_NAME=personopplysninger
ENV CONTEXT_PATH=person/personopplysninger
ENV APPD_ENABLED=true

COPY ./build /app
