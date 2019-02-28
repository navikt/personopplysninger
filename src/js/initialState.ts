export default {
  loading: true,
  personalia: {
    fornavn: "",
    etternavn: "",
    fnr: "",
    kontonr: "",
    tlfnr: null,
    spraak: null,
    epostadr: "",
    personstatus: "",
    statsborgerskap: "",
    foedested: "",
    sivilstand: "",
    kjoenn: "",
    datakilder: [{}]
  },
  adresser: {
    boadresse: {
      adresse: "",
      adressetillegg: "",
      bydel: "",
      datoFraOgMed: "",
      kommune: "",
      land: "",
      matrikkeladresse: {
        bruksnummer: null,
        festenummer: null,
        gaardsnummer: null,
        undernummer: null
      },
      postnummer: "",
      poststed: "",
      veiadresse: {
        bokstav: "",
        bolignummer: "",
        gatekode: "",
        husnummer: ""
      }
    },
    geografiskTilknytning: {
      bydel: "",
      datoFraOgMed: "",
      kommune: "",
      land: ""
    },
    postadresse: null,
    prioritertAdresse: null,
    tilleggsadresse: null,
    utenlandskAdresse: null,
    datakilder: [{}]
  }
};
