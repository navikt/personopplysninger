const baseUrl = import.meta.env.VITE_APP_URL;
const redirectPathParam = 'path';

export const redirects: {
    [key: string]: {
        beskrivelse: string;
        knapp: string;
    };
} = {
    /*
    Noen få tjenester kan sende brukeren til Personopplysninger for endring av kontaktinformasjon og kontonummer.
    Brukeren vil samtidig se en en knapp med tilhørende beskrivelse som ruter han/henne tilbake til den opprinnelige tjenesten.

    Fremgangsmåte:
    1) Legg til tjenesten i listen under
    2) Send brukeren til https://www.nav.no/person/personopplysninger/endre-opplysninger/sendt-fra/[KEY]/[REDIRECT_URL]

    Eksempel på url:
    https://www.ansatt.dev.nav.no/person/personopplysninger/nb/endre-opplysninger/sendt-fra/skjema/alderspensjonssoknad/https%3A%2F%2Fwww.nav.no%2Fpselv%2Ftransaksjon%2Fminprofil.jsf

    Hvordan funker det?
    Beskrivelse og tekst på knappen vil bestemmes ut ifra [KEY].
    Lenken tilbake settes ut ifra [REDIRECT_URL] (må være URL encoded).
    --
    Tillatte tjenester med redirect tilbake:
  */
    'skjema/alderspensjonssoknad': {
        beskrivelse:
            'Du har blitt sendt fra alderspensjon. Her kan du legge til eller endre <b>kontaktinformasjon og kontonummer</b>.',
        knapp: 'Gå tilbake til alderspensjon',
    },
    'skjema/alderspensjon': {
        beskrivelse:
            'Du har blitt sendt fra alderspensjon. Her kan du legge til eller endre <b>kontaktinformasjon og kontonummer</b>.',
        knapp: 'Gå tilbake til alderspensjon',
    },
};

export const tillatteTjenester = Object.keys(redirects);

const navnoUrlPattern = new RegExp('^https:\\/\\/((?:[a-z0-9_.-]+\\.(?!$))+)*nav\\.no($|/)', 'i');

export const validateAndDecodeRedirectUrl = (encodedUrl?: string) => {
    if (!encodedUrl) {
        return null;
    }

    const decodedUrl = decodeURIComponent(encodedUrl);

    // Leverage the DOM API to sanitise the URL and then
    // building it back up using only valid parts
    const url = new URL(decodedUrl);
    const sanitizedUrl = `${url.protocol}//${url.host}${url.pathname}${url.search}`;

    return navnoUrlPattern.test(sanitizedUrl) ? sanitizedUrl : null;
};

export const getLoginRedirectUrl = () => {
    const encodedPath = btoa(window.location.pathname + window.location.hash);
    return `${baseUrl}?${redirectPathParam}=${encodedPath}`;
};

export const getRedirectPathFromParam = () => {
    const encodedPath = new URLSearchParams(window.location.search).get(redirectPathParam);
    if (encodedPath) {
        return atob(encodedPath);
    }

    return null;
};
