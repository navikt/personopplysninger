const { injectDecorator } = require("@navikt/nav-dekoratoren-moduler/ssr");
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

const htmlWithDecorator = (filePath) =>
  injectDecorator({ env: ENV, filePath, ...params });

module.exports = htmlWithDecorator;
