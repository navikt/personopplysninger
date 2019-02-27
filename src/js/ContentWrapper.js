import React from "react";
import PropTypes from "prop-types";
import Header from "js/components/Header";
import Personalia from "./components/Personalia";
import AdresseContainer from "./containers/AdresseContainer";
import LinksContainer from "./containers/LinksContainer";
import AlternativListe from "./components/AlternativListe";
import { formatName } from "./utils/text";

const ContentWrapper = ({ personalia, adresser }) => (
  <div className="Content">
    <Header fornavn={formatName(personalia.fornavn)} />
    <Personalia
      fornavn={formatName(personalia.fornavn)}
      etternavn={formatName(personalia.etternavn)}
      personident={personalia.personident}
      kontonr={personalia.kontonr}
      tlfnr={personalia.tlfnr}
      spraak={personalia.spraak}
      epostadr={personalia.epostadr}
      statsborgerskap={personalia.statsborgerskap}
      foedested={personalia.foedested}
      sivilstand={personalia.sivilstand}
      kjoenn={personalia.kjoenn}
    />
    <AdresseContainer adresseInfo={adresser} />
    <LinksContainer />
    <AlternativListe />
  </div>
);

ContentWrapper.propTypes = {
  adresser: PropTypes.shape({
    boadresse: PropTypes.shape({
      adresse: PropTypes.string,
      adressetillegg: PropTypes.any,
      bydel: PropTypes.string,
      datoFraOgMed: PropTypes.string,
      kommune: PropTypes.string,
      land: PropTypes.string,
      matrikkeladresse: PropTypes.shape({
        bruksnummer: PropTypes.any,
        festenummer: PropTypes.any,
        gaardsnummer: PropTypes.any,
        undernummer: PropTypes.any
      }).isRequired,
      postnummer: PropTypes.string,
      poststed: PropTypes.string,
      veiadresse: PropTypes.shape({
        bokstav: PropTypes.string,
        bolignummer: PropTypes.string,
        gatekode: PropTypes.string,
        husnummer: PropTypes.string
      }).isRequired
    }).isRequired,
    datakilder: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
    geografiskTilknytning: PropTypes.shape({
      bydel: PropTypes.string,
      datoFraOgMed: PropTypes.string,
      kommune: PropTypes.string,
      land: PropTypes.string
    }).isRequired,
    postadresse: PropTypes.any,
    prioritertAdresse: PropTypes.any,
    tilleggsadresse: PropTypes.any,
    utenlandskAdresse: PropTypes.any
  }).isRequired,
  personalia: PropTypes.shape({
    datakilder: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
    epostadr: PropTypes.string.isRequired,
    etternavn: PropTypes.string.isRequired,
    personident: PropTypes.shape({
      verdi: PropTypes.string,
      type: PropTypes.string
    }),
    foedested: PropTypes.string.isRequired,
    fornavn: PropTypes.string.isRequired,
    kjoenn: PropTypes.string.isRequired,
    kontonr: PropTypes.string.isRequired,
    sivilstand: PropTypes.string.isRequired,
    spraak: PropTypes.any,
    statsborgerskap: PropTypes.string.isRequired,
    tlfnr: PropTypes.shape({
      jobb: PropTypes.string,
      mobil: PropTypes.string,
      privat: PropTypes.string,
      datakilder: PropTypes.arrayOf(PropTypes.shape({}))
    })
  }).isRequired
};

export default ContentWrapper;
