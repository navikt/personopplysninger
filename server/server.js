require("dotenv").config({
  path: "/var/run/secrets/nais.io/vault/environment.env"
});
const express = require("express");
const path = require("path");
const mustacheExpress = require("mustache-express");
const getDecorator = require("./dekorator");
const buildPath = path.resolve(__dirname, "../build");
const basePath = "/person/personopplysninger";
const logger = require("./logger");
const server = express();

server.set("views", `${__dirname}/../build`);
server.set("view engine", "mustache");
server.engine("html", mustacheExpress());

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
  getDecorator()
    .then(fragments => {
      res.render("index.html", fragments);
    })
    .catch(e => {
      const error = `Failed to get decorator: ${e}`;
      logger.error(error);
      res.status(500).send(error);
    })
);

const port = process.env.PORT || 8080;
server.listen(port, () => logger.info(`App listening on port: ${port}`));

process.on("SIGTERM", () =>
  setTimeout(() => logger.info("Har sovet i 30 sekunder"), 30000)
);
