const Redirects = () => {
  const redirects = {
    // Prod urls
    "soknad-om-pensjon": {
      url: `https://tjenester.nav.no/pselv/publisering/dinpensjon.jsf`,
      beskrivelse: `Du har blitt sendt fra pensjonsøknaden. Her kan du legg til eller endre <b>kontaktinformasjon, midlertidig adresse og kontonummer</b>.`,
      knapp: "Gå tilbake til pensjon"
    }
  };
  if (window.location.hostname.indexOf("www-q1") > -1) {
    redirects[
      "soknad-om-pensjon"
    ].url = `https://tjenester-q1.nav.no/pselv/publisering/dinpensjon.jsf`;
  }
  if (window.location.hostname.indexOf("www-q0") > -1) {
    redirects[
      "soknad-om-pensjon"
    ].url = `https://tjenester-q0.nav.no/pselv/publisering/dinpensjon.jsf`;
  }
  return redirects;
};

export default Redirects;
