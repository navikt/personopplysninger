const {
  injectDecoratorServerSide,
} = require("@navikt/nav-dekoratoren-moduler/ssr");

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

const getHtmlWithDecorator = (filePath) =>
  injectDecoratorServerSide({
    env: process.env.ENV,
    filePath: filePath,
    ...params,
  });

module.exports = getHtmlWithDecorator;
