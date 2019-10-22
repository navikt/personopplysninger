const Redirects = () => {
  var host = window.location.host;
  var subdomain = host.split(".")[0];

  const redirects = {
    // Prod
    "soknad-om-pensjon": {
      url: `https://tjenester.nav.no/pselv/publisering/dinpensjon.jsf`,
      beskrivelse: `Du har blitt sendt fra pensjonsøknaden. Her kan du legg til eller endre <b>kontaktinformasjon, midlertidig adresse og kontonummer</b>.`,
      knapp: "Gå tilbake til pensjon"
    }
  };

  if (subdomain !== "www") {
    // Q0, Q1 etc
    const env = subdomain.split("-")[1];
    redirects["soknad-om-pensjon"] = {
      ...redirects["soknad-om-pensjon"],
      url: `https://tjenester-${env}.nav.no/pselv/publisering/dinpensjon.jsf`
    };
  }

  return redirects;
};

export default Redirects;
