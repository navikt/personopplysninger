const { fetchDecoratorHtml } = require("@navikt/nav-dekoratoren-moduler/ssr");
const logger = require("./logger");
const { ENV } = process.env;

const params = {
  enforceLogin: true,
  level: "Level4",
  redirectToApp: true,
};

const getIndexWithDecorator = async (res) =>
  await fetchDecoratorHtml({ ENV, ...params })
    // Cached innerHTML of { header, footer, scripts, styles }
    .then((fragments) => {
      res.render("index.html", fragments);
    })
    .catch((e) => {
      logger.error(e);
      res.status(500).send(e);
    });

module.exports = getIndexWithDecorator;
