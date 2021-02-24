const { fetchDecoratorHtml } = require("@navikt/nav-dekoratoren-moduler/ssr");
const logger = require("./logger");
const { ENV } = process.env;

const baseUrl = `https://www.nav.no/person`;

const params = {
  enforceLogin: true,
  level: "Level4",
  redirectToApp: true,
  breadcrumbs: [
    { url: `${baseUrl}/dittnav/`, title: "Ditt NAV" },
    { url: `${baseUrl}/personopplysninger/`, title: `Personopplysninger` },
  ],
  availableLanguages: [
    { url: `${baseUrl}/personopplysninger/nb/`, locale: "nb" },
    { url: `${baseUrl}/personopplysninger/en/`, locale: "en" },
  ],
};

const getIndexWithDecorator = async (res) =>
  await fetchDecoratorHtml({ env: ENV, ...params })
    // Cached innerHTML of { header, footer, scripts, styles }
    .then((fragments) => {
      res.render("index.html", fragments);
    })
    .catch((e) => {
      logger.error(e);
      res.status(500).send(e);
    });

module.exports = getIndexWithDecorator;
