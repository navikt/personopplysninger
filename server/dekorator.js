const { injectDecoratorServerSide } = require('@navikt/nav-dekoratoren-moduler/ssr');

const getHtmlWithDecorator = (filePath) =>
    injectDecoratorServerSide({
        env: process.env.VITE_ENV,
        filePath: filePath,
        params: {
            enforceLogin: false,
            breadcrumbs: [
                { url: `https://www.nav.no/minside/`, title: 'Min side' },
                { url: `https://www.nav.no/person/personopplysninger/`, title: `Personopplysninger` },
            ],
            availableLanguages: [
                { url: `https://www.nav.no/person/personopplysninger/nb/`, locale: 'nb' },
                { url: `https://www.nav.no/person/personopplysninger/en/`, locale: 'en' },
                { url: `https://www.nav.no/person/personopplysninger/nn/`, locale: 'nn' },
            ],
            logoutWarning: true,
        },
    });

module.exports = getHtmlWithDecorator;
