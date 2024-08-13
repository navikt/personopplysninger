import { injectDecoratorServerSide } from '@navikt/nav-dekoratoren-moduler/ssr';

type DecoratorNaisEnv = 'prod' | 'dev' | 'beta' | 'betaTms' | 'devNext' | 'prodNext';

export const getHtmlWithDecorator = (filePath: string) =>
    injectDecoratorServerSide({
        env: process.env.ENV as DecoratorNaisEnv,
        filePath,
        params: {
            enforceLogin: false,
            breadcrumbs: [
                { url: 'https://www.nav.no/minside/', title: 'Min side' },
                { url: 'https://www.nav.no/person/personopplysninger/', title: 'Personopplysninger' },
            ],
            availableLanguages: [
                { url: 'https://www.nav.no/person/personopplysninger/nb/', locale: 'nb' },
                { url: 'https://www.nav.no/person/personopplysninger/en/', locale: 'en' },
                { url: 'https://www.nav.no/person/personopplysninger/nn/', locale: 'nn' },
            ],
            logoutWarning: true,
        },
    });
