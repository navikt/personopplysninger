const ENV_LOCAL = ".env";
const ENV_NAIS = "/var/run/secrets/nais.io/vault/.env";
require("dotenv").config({
  path: process.env.NODE_ENV === "production" ? ENV_NAIS : ENV_LOCAL,
});
const express = require("express");
const path = require("path");
const htmlWithDecorator = require("./dekorator");
const buildPath = path.resolve(__dirname, "../build");
const basePath = "/person/personopplysninger";
const logger = require("./logger");
const server = express();

// Parse application/json
server.use(express.json());
server.use((req, res, next) => {
  res.removeHeader("X-Powered-By");
  next();
});

// Static files
server.use(basePath, express.static(buildPath, { index: false }));

// Nais functions
server.get(`${basePath}/internal/isAlive|isReady`, (req, res) =>
  res.sendStatus(200)
);

// Match everything except internal og static
server.use(/^(?!.*\/(internal|static)\/).*$/, (req, res) =>
  htmlWithDecorator(`${buildPath}/index.html`)
    .then((html) => {
      res.send(html);
    })
    .catch((e) => {
      logger.error(e);
      res.status(500).send(e);
    })
);

const port = process.env.PORT || 8080;
server.listen(port, () => logger.info(`App listening on port: ${port}`));

process.on("SIGTERM", () =>
  setTimeout(() => logger.info("Har sovet i 30 sekunder"), 30000)
);
