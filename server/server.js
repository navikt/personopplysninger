require("dotenv").config();

const express = require("express");
const path = require("path");
const mustacheExpress = require("mustache-express");
const getDecorator = require("./dekorator");
const server = express();

server.set("views", `${__dirname}/../build`);
server.set("view engine", "mustache");
server.engine("html", mustacheExpress());

// parse application/json
server.use(express.json());

server.use((req, res, next) => {
  res.removeHeader("X-Powered-By");
  next();
});

const renderApp = decoratorFragments =>
  new Promise((resolve, reject) =>
    server.render("index.html", decoratorFragments, (err, html) => {
      if (err) reject(err);
      resolve(html);
    })
  );

const startServer = html => {
  server.use(
    "/person/personopplysninger/static/js",
    express.static(path.resolve(`${__dirname}/..`, "build/static/js"))
  );

  server.use(
    "/person/personopplysninger/static/media",
    express.static(path.resolve(`${__dirname}/..`, "build/static/media"))
  );

  server.use(
    "/person/personopplysninger/index.css",
    express.static(path.resolve(`${__dirname}/..`, "build/index.css"))
  );

  server.use(
    "/person/personopplysninger/manifest.json",
    express.static(path.resolve(`${__dirname}/..`, "build/manifest.json"))
  );

  server.use(
    "/person/personopplysninger/favicon.ico",
    express.static(path.resolve(`${__dirname}/..`, "build/favicon.ico"))
  );

  server.get(
    "/person/personopplysninger/internal/isAlive|isReady",
    (req, res) => res.sendStatus(200)
  );

  server.use("/person/personopplysninger", (req, res) => {
    res.send(html);
  });

  const port = process.env.PORT || 8080;
  server.listen(port, () => console.log(`App listening on port: ${port}`));
};

const logError = (errorMessage, details) => console.log(errorMessage, details);

getDecorator()
  .then(renderApp, error => logError("Failed to get decorator", error))
  .then(startServer, error => logError("Failed to render app", error));

process.on("SIGTERM", () =>
  setTimeout(() => console.log("Har sovet i 30 sekunder"), 30000)
);
