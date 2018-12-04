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
          navn={this.props.userInfo.navn}
          ident={this.props.userInfo.ident}
          statsborgerskap={this.props.userInfo.statsborgerskap}
          status={this.props.userInfo.status}
          telefon={this.props.userInfo.telefon}
          tiltak={this.props.userInfo.tiltak}
          kjonn={this.props.userInfo.kjonn}
          spraak={this.props.userInfo.spraak}
          sivilstand={this.props.userInfo.sivilstand}
          kontonummer={this.props.userInfo.kontonummer}
          spesreg={this.props.userInfo.spesreg}
        />
        <AdresseContainer
          adresseInfo={this.props.userInfo.adresseinfo}
        />
        <LinksContainer />
        <AlternativListe />
        <FooterInfo />
      </div>
    );
  }
}

const prioritertAdresseShape = PropTypes.shape({
  datoFraOgMed: PropTypes.string.isRequired,
  kilde: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
});

const sivilstandShape = PropTypes.shape({
  datoFraOgMed: PropTypes.string.isRequired,
  kilde: PropTypes.string.isRequired,
  kode: PropTypes.string.isRequired,
});

ContentWrapper.propTypes = {
  userInfo: PropTypes.shape({
    adresseinfo: PropTypes.shape({
      boadresse: PropTypes.shape({
        adresse: PropTypes.string.isRequired,
        adressetillegg: PropTypes.string.isRequired,
        bydel: PropTypes.string.isRequired,
        datoFraOgMed: PropTypes.string.isRequired,
        kilde: PropTypes.string.isRequired,
        kommune: PropTypes.string.isRequired,
        landkode: PropTypes.string.isRequired,
        matrikkeladresse: PropTypes.shape({
          bruksnummer: PropTypes.string.isRequired,
          festenummer: PropTypes.string.isRequired,
          gaardsnummer: PropTypes.string.isRequired,
          undernummer: PropTypes.string.isRequired,
        }).isRequired,
        postnummer: PropTypes.string.isRequired,
        veiadresse: PropTypes.shape({
          bokstav: PropTypes.string.isRequired,
          bolignummer: PropTypes.string.isRequired,
          gatekode: PropTypes.string.isRequired,
          husnummer: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
      geografiskTilknytning: PropTypes.shape({
        bydel: PropTypes.string.isRequired,
        datoFraOgMed: PropTypes.string.isRequired,
        kilde: PropTypes.string.isRequired,
        kommune: PropTypes.string.isRequired,
        land: PropTypes.string.isRequired,
      }).isRequired,
      postadresse: PropTypes.shape({
        adresse1: PropTypes.string.isRequired,
        adresse2: PropTypes.string.isRequired,
        adresse3: PropTypes.string.isRequired,
        datoFraOgMed: PropTypes.string.isRequired,
        kilde: PropTypes.string.isRequired,
        land: PropTypes.string.isRequired,
        postnummer: PropTypes.string.isRequired,
      }).isRequired,
      prioritertAdresse: prioritertAdresseShape.isRequired,
      tilleggsadresse: PropTypes.shape({
        adresse1: PropTypes.string.isRequired,
        adresse2: PropTypes.string.isRequired,
        adresse3: PropTypes.string.isRequired,
        bolignummer: PropTypes.string.isRequired,
        bydel: PropTypes.string.isRequired,
        datoFraOgMed: PropTypes.string.isRequired,
        gateKode: PropTypes.string.isRequired,
        husbokstav: PropTypes.string.isRequired,
        husnummer: PropTypes.string.isRequired,
        kilde: PropTypes.string.isRequired,
        kommunenummer: PropTypes.string.isRequired,
        postboksanlegg: PropTypes.string.isRequired,
        postboksnummer: PropTypes.string.isRequired,
        postnummer: PropTypes.string.isRequired,
      }).isRequired,
      utenlandskAdresse: PropTypes.shape({
        adresse1: PropTypes.string.isRequired,
        adresse2: PropTypes.string.isRequired,
        adresse3: PropTypes.string.isRequired,
        datoFraOgMed: PropTypes.string.isRequired,
        kilde: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    barnListe: PropTypes.arrayOf(PropTypes.shape({
      datoRegistert: PropTypes.string,
      egenansatt: PropTypes.bool,
      fnr: PropTypes.string,
      kilde: PropTypes.string,
      spesreg: PropTypes.string,
    }).isRequired).isRequired,
    brukerbehovListe: PropTypes.arrayOf(PropTypes.shape({
      behov: PropTypes.string.isRequired,
      datoFraOgMed: PropTypes.string.isRequired,
      kilde: PropTypes.string.isRequired,
    }).isRequired).isRequired,
    datoFraOgMed: PropTypes.string.isRequired,
    doedsdato: PropTypes.shape({
      dato: PropTypes.string.isRequired,
      datoFraOgMed: PropTypes.string.isRequired,
      kilde: PropTypes.string.isRequired,
    }).isRequired,
    egenansatt: PropTypes.shape({
      datoFraOgMed: PropTypes.string.isRequired,
      erEgenansatt: PropTypes.bool,
      kilde: PropTypes.string.isRequired,
    }).isRequired,
    foedselsdato: PropTypes.string.isRequired,
    foedtIKommune: PropTypes.string.isRequired,
    foedtILand: PropTypes.string.isRequired,
    foreldreansvar: prioritertAdresseShape.isRequired,
    ident: PropTypes.string.isRequired,
    identtype: PropTypes.string.isRequired,
    innvandringUtvandring: PropTypes.shape({
      innvandretDato: PropTypes.string.isRequired,
      innvandretKilde: PropTypes.string.isRequired,
      innvandretLand: PropTypes.string.isRequired,
      utvandretDato: PropTypes.string.isRequired,
      utvandretKilde: PropTypes.string.isRequired,
      utvandretLand: PropTypes.string.isRequired,
    }).isRequired,
    kilde: PropTypes.string.isRequired,
    kjonn: PropTypes.string.isRequired,
    kontonummer: PropTypes.shape({
      datoFraOgMed: PropTypes.string.isRequired,
      kilde: PropTypes.string.isRequired,
      nummer: PropTypes.string.isRequired,
    }).isRequired,
    navn: PropTypes.shape({
      datoFraOgMed: PropTypes.string.isRequired,
      forkortetNavn: PropTypes.string.isRequired,
      fornavn: PropTypes.string.isRequired,
      kilde: PropTypes.string.isRequired,
      mellomnavn: PropTypes.string.isRequired,
      slektsnavn: PropTypes.string.isRequired,
      slektsnavnUgift: PropTypes.string.isRequired,
    }).isRequired,
    oppholdstillatelse: prioritertAdresseShape.isRequired,
    relasjon: PropTypes.shape({
      datoFraOgMed: PropTypes.string.isRequired,
      egenansatt: PropTypes.bool,
      fnr: PropTypes.string.isRequired,
      kilde: PropTypes.string.isRequired,
      spesreg: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    }).isRequired,
    samboer: PropTypes.shape({
      datoFraOgMed: PropTypes.string.isRequired,
      fnr: PropTypes.string.isRequired,
      kilde: PropTypes.string.isRequired,
    }).isRequired,
    sivilstand: sivilstandShape.isRequired,
    spesreg: sivilstandShape.isRequired,
    spraak: sivilstandShape.isRequired,
    statsborgerskap: sivilstandShape.isRequired,
    status: sivilstandShape.isRequired,
    telefon: PropTypes.shape({
      jobb: PropTypes.string.isRequired,
      jobbDatoRegistrert: PropTypes.string.isRequired,
      jobbKilde: PropTypes.string.isRequired,
      mobil: PropTypes.string.isRequired,
      mobilDatoRegistrert: PropTypes.string.isRequired,
      mobilKilde: PropTypes.string.isRequired,
      privat: PropTypes.string.isRequired,
      privatDatoRegistrert: PropTypes.string.isRequired,
      privatKilde: PropTypes.string.isRequired,
    }).isRequired,
    tiltak: PropTypes.shape({
      datoFraOgMed: PropTypes.string.isRequired,
      datoTil: PropTypes.string.isRequired,
      kilde: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    }).isRequired,
    utenlandsinfoList: PropTypes.arrayOf(PropTypes.shape({
      datoFraOgMed: PropTypes.string.isRequired,
      familienavnFodt: PropTypes.string.isRequired,
      farsFamilenavn: PropTypes.string.isRequired,
      farsFornavn: PropTypes.string.isRequired,
      foedested: PropTypes.string.isRequired,
      fornavnFodt: PropTypes.string.isRequired,
      idOff: PropTypes.string.isRequired,
      institusjon: PropTypes.string.isRequired,
      institusjonNavn: PropTypes.string.isRequired,
      kilde: PropTypes.string.isRequired,
      kildePin: PropTypes.string.isRequired,
      land: PropTypes.string.isRequired,
      morsFamilenavn: PropTypes.string.isRequired,
      morsFornavn: PropTypes.string.isRequired,
      nasjonalId: PropTypes.string.isRequired,
      nasjonalitet: PropTypes.string.isRequired,
      sedRef: PropTypes.string.isRequired,
      sektor: PropTypes.string.isRequired,
    }).isRequired).isRequired,
    utenlandskBank: PropTypes.shape({
      adresse1: PropTypes.string.isRequired,
      adresse2: PropTypes.string.isRequired,
      adresse3: PropTypes.string.isRequired,
      bankkode: PropTypes.string.isRequired,
      banknavn: PropTypes.string.isRequired,
      datoFraOgMed: PropTypes.string.isRequired,
      iban: PropTypes.string.isRequired,
      kilde: PropTypes.string.isRequired,
      kontonummer: PropTypes.string.isRequired,
      land: PropTypes.string.isRequired,
      swiftkode: PropTypes.string.isRequired,
      valuta: PropTypes.string.isRequired,
    }).isRequired,
    vergemaalListe: PropTypes.arrayOf(PropTypes.shape({
      aaksId: PropTypes.string.isRequired,
      datoFraOgMed: PropTypes.string.isRequired,
      egenansatt: PropTypes.bool,
      embete: PropTypes.string.isRequired,
      fnr: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      kilde: PropTypes.string.isRequired,
      mandattype: PropTypes.string.isRequired,
      sakstype: PropTypes.string.isRequired,
      spesreg: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      vedtaksdato: PropTypes.string.isRequired,
    }).isRequired).isRequired,
  }).isRequired,
};

export default ContentWrapper;
