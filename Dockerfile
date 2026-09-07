FROM europe-north1-docker.pkg.dev/cgr-nav/pull-through/nav.no/node:24-dev AS runtime-files

WORKDIR /app
COPY dist/ ./dist/
COPY node_modules/ ./node_modules/

FROM europe-north1-docker.pkg.dev/cgr-nav/pull-through/nav.no/node:24-slim

ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=8080

WORKDIR /app
COPY --from=runtime-files /app/dist ./dist
COPY --from=runtime-files /app/node_modules ./node_modules

EXPOSE 8080

CMD ["node", "dist/server/entry.mjs"]
