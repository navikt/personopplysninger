FROM docker.adeo.no:5000/pus/decorator

ENV APPLICATION_NAME=personopplysninger
ENV CONTEXT_PATH=personopplysninger

COPY ./build /app