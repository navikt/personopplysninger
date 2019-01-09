import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Personalia from './components/Personalia';
import AdresseContainer from './containers/AdresseContainer';
import LinksContainer from './containers/LinksContainer';
import AlternativListe from './components/AlternativListe';
import FooterInfo from './components/FooterInfo';

class ContentWrapper extends Component {
  render() {
    return (
      <div>
        <Personalia
          fornavn={this.props.personalia.fornavn}
          etternavn={this.props.personalia.etternavn}
          fnr={this.props.personalia.fnr}
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
        <FooterInfo />
      </div>
    );
  }
}


ContentWrapper.propTypes = {
  adresser: PropTypes.shape({
    boadresse: PropTypes.shape({
      adresse: PropTypes.string.isRequired,
      adressetillegg: PropTypes.any,
      bydel: PropTypes.string.isRequired,
      datoFraOgMed: PropTypes.string.isRequired,
      kommune: PropTypes.string.isRequired,
      landkode: PropTypes.string.isRequired,
      matrikkeladresse: PropTypes.shape({
        bruksnummer: PropTypes.any,
        festenummer: PropTypes.any,
        gaardsnummer: PropTypes.any,
        undernummer: PropTypes.any,
      }).isRequired,
      postnummer: PropTypes.string.isRequired,
      veiadresse: PropTypes.shape({
        bokstav: PropTypes.string.isRequired,
        bolignummer: PropTypes.string.isRequired,
        gatekode: PropTypes.string.isRequired,
        husnummer: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    datakilder: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
    geografiskTilknytning: PropTypes.shape({
      bydel: PropTypes.string.isRequired,
      datoFraOgMed: PropTypes.string.isRequired,
      kommune: PropTypes.string.isRequired,
      land: PropTypes.string.isRequired,
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
    fnr: PropTypes.string.isRequired,
    foedested: PropTypes.string.isRequired,
    fornavn: PropTypes.string.isRequired,
    kjoenn: PropTypes.string.isRequired,
    kontonr: PropTypes.string.isRequired,
    personstatus: PropTypes.string.isRequired,
    sivilstand: PropTypes.string.isRequired,
    spraak: PropTypes.any,
    statsborgerskap: PropTypes.string.isRequired,
    tlfnr: PropTypes.any,
  }).isRequired,
};

export default ContentWrapper;
