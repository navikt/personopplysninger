FROM europe-north1-docker.pkg.dev/cgr-nav/pull-through/nav.no/node:24-slim@sha256:87f0526f62cc7f5d0de01a024a99bcbb83b2e655bd3013c4828ab86e1914984e

WORKDIR /app

COPY ./dist ./dist
COPY ./node_modules ./node_modules

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

EXPOSE $PORT

CMD ["./dist/server/entry.mjs"]
