import Environment from "Environments";

const { appUrl } = Environment();

/*
  Redirect url-er lagt inn i navikt/loginservice

  Eksempel:
  Brukeren kan navigere uinlogget til
  www.nav.no/person/personopplysninger/arbeidsforhold -> loginservice -> www.nav.no/person/personopplysninger/arbeidsforhold

  Alle andre undersider sendes brukeren til forsiden etter innlogging.
*/

export default [`${appUrl}/`, `${appUrl}/arbeidsforhold`, `${appUrl}/dsop`];
