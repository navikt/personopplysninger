const { injectDecoratorServerSide } = require("@navikt/nav-dekoratoren-moduler/ssr");

const getHtmlWithDecorator = (filePath) =>
  injectDecoratorServerSide({
      env: process.env.ENV,
      filePath: filePath,
      enforceLogin: true,
      level: "Level4",
      redirectToApp: true,
      utloggingsvarsel: true,
      breadcrumbs: [
          { url: `https://www.nav.no/person/dittnav/`, title: "Ditt NAV" },
          { url: `https://www.nav.no/person/personopplysninger/`, title: `Personopplysninger` },
      ],
      availableLanguages: [
          { url: `https://www.nav.no/person/personopplysninger/nb/`, locale: "nb" },
          { url: `https://www.nav.no/person/personopplysninger/en/`, locale: "en" },
      ],
  });

module.exports = getHtmlWithDecorator;
