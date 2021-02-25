const { injectDecorator } = require("@navikt/nav-dekoratoren-moduler/ssr");
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
  await injectDecorator({ env: ENV, fileName: "public/index.html", ...params })
    .then((html) => {
      res.render(html);
    })
    .catch((e) => {
      logger.error(e);
      res.status(500).send(e);
    });

module.exports = getIndexWithDecorator;
