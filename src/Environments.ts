const Environment = () => {
  var host = window.location.host;
  var subdomain = host.split(".")[0];

  if (process.env.NODE_ENV === "development") {
    return {
      miljo: "LOCAL",
      baseUrl: "http://localhost:8080",
      appUrl: "http://localhost:8080/person/personopplysninger",
      apiUrl: "http://localhost:8080/person/personopplysninger-api",
      dsopUrl: "http://localhost:8080/person/dsop-api",
      tjenesteUrl: "https://tjenester-q0.nav.no",
      loginUrl: "http://localhost:8080/personbruker-api/local/cookie",
      logoutUrl: "#"
    };
  }

  if (subdomain !== "www") {
    // Q0, Q1 etc
    const env = subdomain.split("-")[1];
    return {
      miljo: env.toUpperCase(),
      baseUrl: `https://www-${env}.nav.no`,
      appUrl: `https://www-${env}.nav.no/person/personopplysninger`,
      apiUrl: `https://www-${env}.nav.no/person/personopplysninger-api`,
      dsopUrl: `https://www-${env}.nav.no/person/dsop-api`,
      tjenesteUrl: `https://tjenester-${env}.nav.no`,
      loginUrl: "https://loginservice-q.nav.no/login",
      logoutUrl: "https://loginservice-q.nav.no/slo"
    };
  }

  return {
    miljo: "PROD",
    baseUrl: "https://www.nav.no",
    appUrl: "https://www.nav.no/person/personopplysninger",
    apiUrl: "https://www.nav.no/person/personopplysninger-api",
    dsopUrl: "https://www.nav.no/person/dsop-api",
    tjenesteUrl: "https://tjenester.nav.no",
    loginUrl: "https://loginservice.nav.no/login",
    logoutUrl: "https://loginservice.nav.no/slo"
  };
};

export default Environment;
