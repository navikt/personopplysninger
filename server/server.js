const express = require("express");
const logger = require("./logger");
const path = require("path");
const buildPath = path.resolve(__dirname, "../build");
const basePath = "/person/personopplysninger";
const server = express();
const ENV = process.env.NODE_ENV;
const ENV_LOCAL = ".env";
const ENV_NAIS = "/var/run/secrets/nais.io/vault/.env";
require("dotenv").config({ path: ENV === "production" ? ENV_NAIS : ENV_LOCAL });
const getHtmlWithDecorator = require("./dekorator");

server.use(express.json());
server.use(`${basePath}`, express.static(buildPath, { index: false }));
server.get(`${basePath}/internal/isAlive|isReady`, (req, res) =>
  res.sendStatus(200)
);

// Match everything except internal og static
server.use(/^(?!.*\/(internal|static)\/).*$/, (req, res) =>
  getHtmlWithDecorator(`${buildPath}/index.html`)
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
