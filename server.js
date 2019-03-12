require("dotenv").config();

const express = require("express");
const path = require("path");
const mustacheExpress = require("mustache-express");
const getDecorator = require("./src/build/decorator");

const server = express();

server.set("views", `${__dirname}/build`);
server.set("view engine", "mustache");
server.engine("html", mustacheExpress());

server.use((req, res, next) => {
  res.removeHeader("X-Powered-By");
  next();
});

const renderApp = decoratorFragments =>
  new Promise((resolve, reject) => {
    server.render("index.html", decoratorFragments, (err, html) => {
      if (err) {
        reject(err);
      } else {
        resolve(html);
      }
    });
  });

const startServer = html => {
  // can be used for testing purposes
  // const delayAllResponses = millis => (req, res, next) => setTimeout(next, millis);
  // server.use(delayAllResponses(1000));

  server.use(
    "person/personopplysninger/mock-api",
    express.static(path.resolve(__dirname, "src/mock-api"))
  );
  server.use(
    "person/personopplysninger/static/js",
    express.static(path.resolve(__dirname, "build/static/js"))
  );

  server.use(
    "person/personopplysninger/static/css",
    express.static(path.resolve(__dirname, "build/static/css"))
  );

  server.use(
    "person/personopplysninger/static/fonts",
    express.static(path.resolve(__dirname, "build/static/fonts"))
  );

  server.use(
    "person/personopplysninger/static/media",
    express.static(path.resolve(__dirname, "build/static/media"))
  );

  server.get("/person/personopplysninger/config", (req, res) =>
    res.send({ tjenesteUrl: process.env.TJENESTER_URL })
  );

  server.get(/^\/(?!.*static).*$/, (req, res) => {
    res.send(html);
  });

  const port = process.env.PORT || 8080;
  server.listen(port, () => {
    console.log(`App listening on port: ${port}`); // eslint-disable-line
  });
};

const logError = (errorMessage, details) => console.log(errorMessage, details); // eslint-disable-line

getDecorator()
  .then(renderApp, error => logError("Failed to get decorator", error))
  .then(startServer, error => logError("Failed to render app", error));
