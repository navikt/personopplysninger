export const redirects: {
  [key: string]: {
    beskrivelse: string;
    knapp: string;
    allowed: string;
  };
} = {
  /*
    Obs: dersom endringer gjøres her, husk å sjekke om endringene er dekket av eksisterende whitelisting i loginservice, og oppdater om nødvendig

    Andre tjenester kan sende brukeren til Personopplysninger for endring av kontaktinformasjon, kontonummer og midlertidig adresse.
    Brukeren vil samtidig se en en knapp med tilhørende beskrivelse som ruter han/henne tilbake til den opprinnelige tjenesten.

    Fremgangsmåte:
    1) Legg til tjenesten i listen under
    2) Send brukeren til https://www.nav.no/person/personopplysninger/endre-opplysninger/sendt-fra/[KEY]/[REDIRECT_URL]

    Eksempel på url:
    https://www.nav.no/person/personopplysninger/endre-opplysninger/sendt-fra/publisering/dinpensjon/https%3A%2F%2Fwww.nav.no%2Fpselv%2Fpublisering%2Fdinpensjon.jsf

    Hvordan funker det?
    Beskrivelse og tekst på knappen vil bestemmes ut ifra [KEY].
    Lenken tilbake settes ut ifra [REDIRECT_URL] (må være URL encoded).

    --
    Tillatte tjenester med redirect tilbake:
  */
  "skjema/alderspensjon": {
    allowed: `https%3A%2F%2Fwww?-?.?..nav.no%2Fpselv%2F.*`,
    beskrivelse: `Du har blitt sendt fra alderspensjon. Her kan du legge til eller endre <b>kontaktinformasjon, midlertidig adresse og kontonummer</b>.`,
    knapp: "Gå tilbake til alderspensjon"
  },
  "skjema/innledning": {
    allowed: `https%3A%2F%2Fwww?-?.?..nav.no%2Fpselv%2F.*`,
    beskrivelse: `Du har blitt sendt fra alderspensjon. Her kan du legge til eller endre <b>kontaktinformasjon, midlertidig adresse og kontonummer</b>.`,
    knapp: "Gå tilbake til alderspensjon"
  },
  "skjema/kvittering": {
    allowed: `https%3A%2F%2Fwww?-?.?..nav.no%2Fpselv%2F.*`,
    beskrivelse: `Du har blitt sendt fra kvittering på søknad. Her kan du legge til eller endre <b>kontaktinformasjon, midlertidig adresse og kontonummer</b>.`,
    knapp: "Gå tilbake til kvitteringen"
  },
  "skjema/uforetrygd": {
    allowed: `https%3A%2F%2Fwww?-?.?..nav.no%2Fpselv%2F.*`,
    beskrivelse: `Du har blitt sendt skjemaet uføretrygd. Her kan du legge til eller endre <b>kontaktinformasjon, midlertidig adresse og kontonummer</b>.`,
    knapp: "Gå tilbake til uføretrygd"
  },
  "dagpenger/forskudd": {
    allowed: `https%3A%2F%2Fwww?-?.?..nav.no%2Fdagpenger%2Fforskudd%2Fsoknad%2F`,
    beskrivelse: `Du har blitt sendt fra søknad om forskudd på dagpenger. Her kan du legge til eller endre <b>kontaktinformasjon, midlertidig adresse og kontonummer</b>.`,
    knapp: "Gå tilbake til søknaden om forskudd på dagpenger"
  },
  minprofil: {
    allowed: `https%3A%2F%2Fwww?-?.?..nav.no%2Fpselv%2F.*`,
    beskrivelse: `Du har blitt sendt fra Din Profil. Her kan du legge til eller endre <b>kontaktinformasjon, midlertidig adresse og kontonummer</b>.`,
    knapp: "Gå tilbake til Din Profil"
  }
};

export const tillatteTjenester = Object.keys(redirects)
  .map((key) => key)
  .join("|");

const urlPatterns = Object.keys(redirects)
  .map((key) => redirects[key].allowed);

export const tillatteUrler = urlPatterns
  .join("|");

const sentFromOtherAppPathSegment = "sendt-fra";
const serviceReturnUrlParam = "returnToAppUrl";

export const getLoginserviceRedirectUrl = () => {
  const url = window.location.origin + window.location.pathname + window.location.hash;

  if (window.location.pathname.includes(sentFromOtherAppPathSegment)) {
    const urlSegments = url.split("/");
    const [serviceReturnUrl] = urlSegments.slice(-1);
    const isValidServiceUrl = urlPatterns.some(pattern => new RegExp(pattern).test(serviceReturnUrl));

    if (isValidServiceUrl) {
      const baseUrl = urlSegments.slice(0, -1).join("/");
      return `${baseUrl}?${serviceReturnUrlParam}=${serviceReturnUrl}`;
    }
  }

  return url;
};

export const getServiceReturnUrl = () => new URLSearchParams(window.location.search).get(serviceReturnUrlParam);
