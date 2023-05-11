const baseUrl = process.env.REACT_APP_URL;
const redirectPathParam = 'path';

const miljo = process.env.REACT_APP_MILJO as "LOCAL" | "DEV" | "PROD";

export const redirects: {
    [key: string]: {
        beskrivelse: string;
        knapp: string;
    };
} = {
    /*
    Andre tjenester kan sende brukeren til Personopplysninger for endring av kontaktinformasjon, kontonummer og kontaktadresse.
    Brukeren vil samtidig se en en knapp med tilhørende beskrivelse som ruter han/henne tilbake til den opprinnelige tjenesten.

    Fremgangsmåte:
    1) Legg til tjenesten i listen under
    2) Send brukeren til https://www.nav.no/person/personopplysninger/endre-opplysninger/sendt-fra/[KEY]/[REDIRECT_URL]

    Eksempel på url:
    https://www.dev.nav.no/person/personopplysninger/nb/endre-opplysninger/sendt-fra/dagpenger/forskudd/https%3A%2F%2Fwww.nav.no%2Fpselv%2Ftransaksjon%2Fminprofil.jsf

    Hvordan funker det?
    Beskrivelse og tekst på knappen vil bestemmes ut ifra [KEY].
    Lenken tilbake settes ut ifra [REDIRECT_URL] (må være URL encoded).
    --
    Tillatte tjenester med redirect tilbake:
  */
    'skjema/alderspensjonssoknad': {
        beskrivelse:
            'Du har blitt sendt fra alderspensjon. Her kan du legge til eller endre <b>kontaktinformasjon, kontaktadresse og kontonummer</b>.',
        knapp: 'Gå tilbake til alderspensjon',
    },
    'skjema/alderspensjon': {
        beskrivelse:
            'Du har blitt sendt fra alderspensjon. Her kan du legge til eller endre <b>kontaktinformasjon, kontaktadresse og kontonummer</b>.',
        knapp: 'Gå tilbake til alderspensjon',
    },
    'skjema/innledning': {
        beskrivelse:
            'Du har blitt sendt fra alderspensjon. Her kan du legge til eller endre <b>kontaktinformasjon, kontaktadresse og kontonummer</b>.',
        knapp: 'Gå tilbake til alderspensjon',
    },
    'skjema/kvittering': {
        beskrivelse:
            'Du har blitt sendt fra kvittering på søknad. Her kan du legge til eller endre <b>kontaktinformasjon, kontaktadresse og kontonummer</b>.',
        knapp: 'Gå tilbake til kvitteringen',
    },
    'skjema/uforetrygd': {
        beskrivelse:
            'Du har blitt sendt skjemaet uføretrygd. Her kan du legge til eller endre <b>kontaktinformasjon, kontaktadresse og kontonummer</b>.',
        knapp: 'Gå tilbake til uføretrygd',
    },
    'dagpenger/forskudd': {
        beskrivelse:
            'Du har blitt sendt fra søknad om forskudd på dagpenger. Her kan du legge til eller endre <b>kontaktinformasjon, kontaktadresse og kontonummer</b>.',
        knapp: 'Gå tilbake til søknaden om forskudd på dagpenger',
    },
    minprofil: {
        beskrivelse: 'Du har blitt sendt fra Din Profil. Her kan du legge til eller endre <b>kontaktinformasjon, kontaktadresse og kontonummer</b>.',
        knapp: 'Gå tilbake til Din Profil',
    },
};

export const tillatteTjenester = Object.keys(redirects);

const navnoUrlPattern = new RegExp('^https:\\/\\/([a-z0-9_.-]+\\.)*nav\\.no($|/)', 'i');

export const validateAndDecodeRedirectUrl = (encodedUrl?: string) => {
    if (!encodedUrl) {
        return null;
    }

    const decodedUrl = decodeURIComponent(encodedUrl);
    return navnoUrlPattern.test(decodedUrl) ? decodedUrl : null;
};

export const getLoginserviceRedirectUrl = () => {
<<<<<<< HEAD
    // encode the path to base64 to prevent URI-decoding in loginservice from altering the parameter
    const encodedPath = btoa(window.location.pathname + window.location.hash);
    return `${baseUrl}?${redirectPathParam}=${encodedPath}`;
=======
  const encodedPath = btoa(window.location.pathname + window.location.hash);
  return miljo === "DEV"
    ? baseUrl
    : `${baseUrl}?${redirectPathParam}=${encodedPath}`;
>>>>>>> master
};

export const getRedirectPathFromParam = () => {
    const encodedPath = new URLSearchParams(window.location.search).get(redirectPathParam);
    if (encodedPath) {
        return atob(encodedPath);
    }

    return null;
};
