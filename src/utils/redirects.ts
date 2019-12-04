export default {
  /*
    Andre tjenester kan sende brukeren til Personopplysninger for endring av kontaktinformasjon, kontonummer og midlertidig adresse.
    Brukeren vil samtidig se en en knapp med tilhørende beskrivelse som ruter han/henne tilbake til den opprinnelige tjenesten.

    Fremgangsmåte:
    1) Legg til tjenesten i listen under
    2) Send brukeren til https://www.nav.no/person/personopplysninger/endre-opplysninger/sendt-fra/[KEY]/[REDIRECT_URL]

    Eksempel på url:
    https://www.nav.no/person/personopplysninger/endre-opplysninger/sendt-fra/publisering/dinpensjon/https%3A%2F%2Ftjenester-q4.nav.no%2Fpselv%2Fpublisering%2Fdinpensjon.jsf

    Hvordan funker det?
    Beskrivelse og tekst på knappen vil bestemmes ut ifra [KEY].
    Lenken tilbake settes ut ifra [REDIRECT_URL] (må være URL encoded).

    --
    Tillatte tjenester med redirect tilbake:
  */
  "skjema/alderspensjon": {
    allowed: `https%3A%2F%2Ftjenester?-?.?..nav.no%2Fpselv%2F.*`,
    beskrivelse: `Du har blitt sendt fra alderspensjon. Her kan du legge til eller endre <b>kontaktinformasjon, midlertidig adresse og kontonummer</b>.`,
    knapp: "Gå tilbake til alderspensjon"
  },
  "skjema/innledning": {
    allowed: `https%3A%2F%2Ftjenester?-?.?..nav.no%2Fpselv%2F.*`,
    beskrivelse: `Du har blitt sendt fra alderspensjon. Her kan du legge til eller endre <b>kontaktinformasjon, midlertidig adresse og kontonummer</b>.`,
    knapp: "Gå tilbake til alderspensjon"
  },
  "skjema/kvittering": {
    allowed: `https%3A%2F%2Ftjenester?-?.?..nav.no%2Fpselv%2F.*`,
    beskrivelse: `Du har blitt sendt fra kvittering på søknad. Her kan du legge til eller endre <b>kontaktinformasjon, midlertidig adresse og kontonummer</b>.`,
    knapp: "Gå tilbake til kvitteringen"
  },
  "skjema/uforetrygd": {
    allowed: `https%3A%2F%2Ftjenester?-?.?..nav.no%2Fpselv%2F.*`,
    beskrivelse: `Du har blitt sendt skjemaet uføretrygd. Her kan du legge til eller endre <b>kontaktinformasjon, midlertidig adresse og kontonummer</b>.`,
    knapp: "Gå tilbake til uføretrygd"
  },
  minprofil: {
    allowed: `https%3A%2F%2Ftjenester?-?.?..nav.no%2Fpselv%2F.*`,
    beskrivelse: `Du har blitt sendt fra Din Profil. Her kan du legge til eller endre <b>kontaktinformasjon, midlertidig adresse og kontonummer</b>.`,
    knapp: "Gå tilbake til Din Profil"
  }
};
