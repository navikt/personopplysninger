const Environment = () => {
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
  if (window.location.hostname.indexOf("www-q1") > -1) {
    return {
      miljo: "Q1",
      baseUrl: "https://www-q1.nav.no",
      appUrl: "https://www-q1.nav.no/person/personopplysninger",
      apiUrl: "https://www-q1.nav.no/person/personopplysninger-api",
      dsopUrl: "https://www-q1.nav.no/person/dsop-api",
      tjenesteUrl: "https://tjenester-q1.nav.no",
      loginUrl: "https://loginservice-q.nav.no/login",
      logoutUrl: "https://loginservice-q.nav.no/slo"
    };
  }
  if (window.location.hostname.indexOf("www-q0") > -1) {
    return {
      miljo: "Q0",
      baseUrl: "https://www-q0.nav.no",
      appUrl: "https://www-q0.nav.no/person/personopplysninger",
      apiUrl: "https://www-q0.nav.no/person/personopplysninger-api",
      dsopUrl: "https://www-q0.nav.no/person/dsop-api",
      tjenesteUrl: "https://tjenester-q0.nav.no",
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
