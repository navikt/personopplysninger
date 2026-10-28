FROM europe-north1-docker.pkg.dev/cgr-nav/pull-through/nav.no/node:24-slim@sha256:e2a25eee46661e5ec73707856e5d6221818353addd21cf6916ffdcfea358dea1

WORKDIR /app

COPY ./dist ./dist
COPY ./node_modules ./node_modules

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

EXPOSE $PORT

CMD ["./dist/server/entry.mjs"]
