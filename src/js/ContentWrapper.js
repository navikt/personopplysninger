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

const datoKildeTypeShape = PropTypes.shape({
  datoFraOgMed: PropTypes.string,
  kilde: PropTypes.string,
  type: PropTypes.string,
});

const sivilstandShape = PropTypes.shape({
  datoFraOgMed: PropTypes.string,
  kilde: PropTypes.string,
  kode: PropTypes.shape({
    kodeverk: PropTypes.string,
    verdi: PropTypes.string,
  }),
});

ContentWrapper.propTypes = {
  userInfo: PropTypes.shape({
    adresseinfo: PropTypes.shape({
      boadresse: PropTypes.shape({
        adresse: PropTypes.string,
        adressetillegg: PropTypes.string,
        bydel: PropTypes.string,
        datoFraOgMed: PropTypes.string,
        kilde: PropTypes.string,
        kommune: PropTypes.string,
        landkode: PropTypes.string,
        matrikkeladresse: PropTypes.shape({
          bruksnummer: PropTypes.string,
          festenummer: PropTypes.string,
          gaardsnummer: PropTypes.string,
          undernummer: PropTypes.string,
        }),
        postnummer: PropTypes.string,
        veiadresse: PropTypes.shape({
          bokstav: PropTypes.string,
          bolignummer: PropTypes.string,
          gatekode: PropTypes.string,
          husnummer: PropTypes.string,
        }),
      }),
      geografiskTilknytning: PropTypes.shape({
        bydel: PropTypes.string,
        datoFraOgMed: PropTypes.string,
        kilde: PropTypes.string,
        kommune: PropTypes.string,
        land: PropTypes.string,
      }),
      postadresse: PropTypes.string,
      prioritertAdresse: PropTypes.string,
      tilleggsadresse: PropTypes.string,
      utenlandskAdresse: PropTypes.string,
    }),
    barnListe: PropTypes.arrayOf(PropTypes.shape({
      datoRegistert: PropTypes.string,
      egenansatt: PropTypes.bool,
      fnr: PropTypes.string,
      kilde: PropTypes.string,
      spesreg: PropTypes.string,
    })),
    brukerbehovListe: PropTypes.arrayOf(PropTypes.shape({
      behov: PropTypes.string,
      datoFraOgMed: PropTypes.string,
      kilde: PropTypes.string,
    })),
    datoFraOgMed: PropTypes.string,
    doedsdato: PropTypes.shape({
      dato: PropTypes.string,
      datoFraOgMed: PropTypes.string,
      kilde: PropTypes.string,
    }),
    egenansatt: PropTypes.shape({
      datoFraOgMed: PropTypes.string,
      erEgenansatt: PropTypes.bool,
      kilde: PropTypes.string,
    }),
    foedselsdato: PropTypes.string,
    foedtIKommune: PropTypes.string,
    foedtILand: PropTypes.string,
    foreldreansvar: datoKildeTypeShape,
    ident: PropTypes.string,
    identtype: PropTypes.shape({
      kodeverk: PropTypes.string,
      verdi: PropTypes.string,
    }),
    innvandringUtvandring: PropTypes.shape({
      innvandretDato: PropTypes.string,
      innvandretKilde: PropTypes.string,
      innvandretLand: PropTypes.shape({
        kodeverk: PropTypes.string,
        verdi: PropTypes.string,
      }),
      utvandretDato: PropTypes.string,
      utvandretKilde: PropTypes.string,
      utvandretLand: PropTypes.shape({
        kodeverk: PropTypes.string,
        verdi: PropTypes.string,
      }),
    }),
    kilde: PropTypes.string,
    kjonn: PropTypes.string,
    kontonummer: PropTypes.shape({
      datoFraOgMed: PropTypes.string,
      kilde: PropTypes.string,
      nummer: PropTypes.string,
    }),
    navn: PropTypes.shape({
      datoFraOgMed: PropTypes.string,
      forkortetNavn: PropTypes.string,
      fornavn: PropTypes.string,
      kilde: PropTypes.string,
      mellomnavn: PropTypes.string,
      slektsnavn: PropTypes.string,
      slektsnavnUgift: PropTypes.string,
    }),
    oppholdstillatelse: datoKildeTypeShape,
    relasjon: PropTypes.shape({
      datoFraOgMed: PropTypes.string,
      egenansatt: PropTypes.bool,
      fnr: PropTypes.string,
      kilde: PropTypes.string,
      spesreg: PropTypes.string,
      type: PropTypes.string,
    }),
    samboer: PropTypes.shape({
      datoFraOgMed: PropTypes.string,
      fnr: PropTypes.string,
      kilde: PropTypes.string,
    }),
    sivilstand: sivilstandShape,
    spesreg: sivilstandShape,
    spraak: sivilstandShape,
    statsborgerskap: sivilstandShape,
    status: sivilstandShape,
    telefon: PropTypes.shape({
      jobb: PropTypes.string,
      jobbDatoRegistrert: PropTypes.string,
      jobbKilde: PropTypes.string,
      mobil: PropTypes.string,
      mobilDatoRegistrert: PropTypes.string,
      mobilKilde: PropTypes.string,
      privat: PropTypes.string,
      privatDatoRegistrert: PropTypes.string,
      privatKilde: PropTypes.string,
    }),
    tiltak: PropTypes.shape({
      datoFraOgMed: PropTypes.string,
      datoTil: PropTypes.string,
      kilde: PropTypes.string,
      type: PropTypes.string,
    }),
    utenlandsinfoList: PropTypes.arrayOf(PropTypes.shape({
      datoFraOgMed: PropTypes.string,
      familienavnFodt: PropTypes.string,
      farsFamilenavn: PropTypes.string,
      farsFornavn: PropTypes.string,
      foedested: PropTypes.string,
      fornavnFodt: PropTypes.string,
      idOff: PropTypes.string,
      institusjon: PropTypes.string,
      institusjonNavn: PropTypes.string,
      kilde: PropTypes.string,
      kildePin: PropTypes.string,
      land: PropTypes.string,
      morsFamilenavn: PropTypes.string,
      morsFornavn: PropTypes.string,
      nasjonalId: PropTypes.string,
      nasjonalitet: PropTypes.string,
      sedRef: PropTypes.string,
      sektor: PropTypes.string,
    })),
    utenlandskBank: PropTypes.shape({
      adresse1: PropTypes.string,
      adresse2: PropTypes.string,
      adresse3: PropTypes.string,
      bankkode: PropTypes.string,
      banknavn: PropTypes.string,
      datoFraOgMed: PropTypes.string,
      iban: PropTypes.string,
      kilde: PropTypes.string,
      kontonummer: PropTypes.string,
      land: PropTypes.string,
      swiftkode: PropTypes.string,
      valuta: PropTypes.string,
    }),
    vergemaalListe: PropTypes.arrayOf(PropTypes.shape({
      aaksId: PropTypes.string,
      datoFraOgMed: PropTypes.string,
      egenansatt: PropTypes.bool,
      embete: PropTypes.string,
      fnr: PropTypes.string,
      id: PropTypes.string,
      kilde: PropTypes.string,
      mandattype: PropTypes.string,
      sakstype: PropTypes.string,
      spesreg: PropTypes.string,
      type: PropTypes.string,
      vedtaksdato: PropTypes.string,
    })),
  }).isRequired,
};

export default ContentWrapper;
