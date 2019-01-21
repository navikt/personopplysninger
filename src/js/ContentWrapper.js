import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Personalia from './components/Personalia';
import AdresseContainer from './containers/AdresseContainer';
import LinksContainer from './containers/LinksContainer';
import AlternativListe from './components/AlternativListe';
import { formatName } from './utils/textUtils';

class ContentWrapper extends Component {
  render() {
    return (
      <div>
        <Personalia
          fornavn={formatName(this.props.personalia.fornavn)}
          etternavn={formatName(this.props.personalia.etternavn)}
          personident={this.props.personalia.personident}
          kontonr={this.props.personalia.kontonr}
          tlfnr={this.props.personalia.tlfnr}
          spraak={this.props.personalia.spraak}
          epostadr={this.props.personalia.epostadr}
          personstatus={this.props.personalia.personstatus}
          statsborgerskap={this.props.personalia.statsborgerskap}
          foedested={this.props.personalia.foedested}
          sivilstand={this.props.personalia.sivilstand}
          kjoenn={this.props.personalia.kjoenn}
        />
        <AdresseContainer
          adresseInfo={this.props.adresser}
        />
        <LinksContainer />
        <AlternativListe />
      </div>
    );
  }
}

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
        undernummer: PropTypes.any,
      }).isRequired,
      postnummer: PropTypes.string,
      poststed: PropTypes.string,
      veiadresse: PropTypes.shape({
        bokstav: PropTypes.string,
        bolignummer: PropTypes.string,
        gatekode: PropTypes.string,
        husnummer: PropTypes.string,
      }).isRequired,
    }).isRequired,
    datakilder: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
    geografiskTilknytning: PropTypes.shape({
      bydel: PropTypes.string,
      datoFraOgMed: PropTypes.string,
      kommune: PropTypes.string,
      land: PropTypes.string,
    }).isRequired,
    postadresse: PropTypes.any,
    prioritertAdresse: PropTypes.any,
    tilleggsadresse: PropTypes.any,
    utenlandskAdresse: PropTypes.any,
  }).isRequired,
  personalia: PropTypes.shape({
    datakilder: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
    epostadr: PropTypes.string.isRequired,
    etternavn: PropTypes.string.isRequired,
    personident: PropTypes.shape({
      verdi: PropTypes.string,
      type: PropTypes.string,
    }),
    foedested: PropTypes.string.isRequired,
    fornavn: PropTypes.string.isRequired,
    kjoenn: PropTypes.string.isRequired,
    kontonr: PropTypes.string.isRequired,
    personstatus: PropTypes.string.isRequired,
    sivilstand: PropTypes.string.isRequired,
    spraak: PropTypes.any,
    statsborgerskap: PropTypes.string.isRequired,
    tlfnr: PropTypes.shape({
      jobb: PropTypes.string,
      mobil: PropTypes.string,
      privat: PropTypes.string,
      datakilder: PropTypes.arrayOf(PropTypes.shape({})),
    }),
  }).isRequired,
};

export default ContentWrapper;
