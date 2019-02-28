const Environment = () => {
  if (process.env.NODE_ENV === "development") {
    return {
      apiUrl: "http://localhost:8080/person/personopplysninger-api",
      loginUrl: "http://localhost:8080/personbruker-api/local/cookie",
      logoutUrl: "#"
    };
  }
  if (window.location.hostname.indexOf("www-t6") > -1) {
    return {
      apiUrl:
        "https://personopplysninger-api-t6.nais.oera-q.local/personopplysninger-api",
      loginUrl: "https://loginservice-q.nav.no/login",
      logoutUrl: "https://loginservice-q.nav.no/slo"
    };
  }
  if (window.location.hostname.indexOf("www-q0") > -1) {
    return {
      apiUrl: "https://www-q0.nav.no/person/personopplysninger-api",
      loginUrl: "https://loginservice-q.nav.no/login",
      logoutUrl: "https://loginservice-q.nav.no/slo"
    };
  }
  if (window.location.hostname.indexOf("www-q4") > -1) {
    return {
      apiUrl:
        "https://personopplysninger-api-q4.nais.oera-q.local/personopplysninger-api",
      loginUrl: "https://loginservice-q.nav.no/login",
      logoutUrl: "https://loginservice-q.nav.no/slo"
    };
  }
  if (window.location.hostname.indexOf("www-q6") > -1) {
    return {
      apiUrl:
        "https://personopplysninger-api-q6.nais.oera-q.local/personopplysninger-api",
      loginUrl: "https://loginservice-q.nav.no/login",
      logoutUrl: "https://loginservice-q.nav.no/slo"
    };
  }
  if (window.location.hostname.indexOf("person-q") > -1) {
    return {
      apiUrl: "https://person-q.nav.no/personopplysninger-api",
      loginUrl: "https://loginservice-q.nav.no/login",
      logoutUrl: "https://loginservice-q.nav.no/slo"
    };
  }

  return {
    apiUrl: "https://www.nav.no/person/personopplysninger-api",
    loginUrl: "https://loginservice.nav.no/login",
    logoutUrl: "https://loginservice.nav.no/slo"
  };
};

export default Environment;
