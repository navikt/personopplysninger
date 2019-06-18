require("dotenv").config();

const express = require("express");
const path = require("path");
const mustacheExpress = require("mustache-express");
const getDecorator = require("./dekorator");
const { getSecrets, getMockSecrets } = require("./getSecrets");

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
  server.use("/person/personopplysninger", (req, res) => {
    res.send(html);
  });

  server.get("/person/personopplysninger/internal/alive|ready", (req, res) =>
    res.sendStatus(200)
  );

  server.use(
    "/personopplysninger/static",
    express.static(path.resolve(`${__dirname}/..`, "build/static"))
  );

  const port = process.env.PORT || 8080;
  server.listen(port, () => console.log(`App listening on port: ${port}`));
};

const logError = (errorMessage, details) => console.log(errorMessage, details);

if (process.env.NODE_ENV === "production") {
  getDecorator()
    .then(renderApp, error => logError("Failed to get decorator", error))
    .then(startServer, error => logError("Failed to render app", error));
}

process.on("SIGTERM", () =>
  setTimeout(() => console.log("Har sovet i 30 sekunder"), 30000)
);
