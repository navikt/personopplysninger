import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Box from 'js/components/Box';
import { FormattedMessage } from 'react-intl';
import person from '../../assets/img/person.png';
import ListElement from './ListElement';

class Personalia extends Component {
  render() {
    return (
      <Box
        header="Personalia"
        icon={person}
        infoType="personalia"
      >
        <ul className="personalia-list">
          <ListElement
            titleId="personalia.first_name"
            content={this.props.navn ? this.props.navn.fornavn : ''}
          />
          <ListElement
            titleId="personalia.surname"
            content={this.props.navn ? this.props.navn.slektsnavn : ''}
          />
          <ListElement
            titleId="personalia.fnr"
            content={this.props.ident}
          />
          <ListElement
            titleId="personalia.foreign_id"
            content="x"
          />
          <ListElement
            titleId="personalia.phone"
            content={this.props.telefon ? this.props.telefon.privat : ''}
          />
          <ListElement
            titleId="personalia.account_no"
            content={this.props.kontonummer ? this.props.kontonummer.nummer : ''}
          />
          <ListElement
            titleId="personalia.email"
            content="x"
          />
          <ListElement
            titleId="personalia.language"
            content={this.props.spraak ? this.props.spraak.kode : ''}
          />
          <ListElement
            titleId="personalia.citizenship"
            content={this.props.statsborgerskap ? this.props.statsborgerskap.kode : ''}
          />
          <ListElement
            titleId="personalia.status"
            content={this.props.status ? this.props.status.kode : ''}
          />
          <ListElement
            titleId="personalia.birthplace"
            content="x"
          />
          <ListElement
            titleId="personalia.spesreg"
            content={this.props.spesreg ? this.props.spesreg.kode : ''}
          />
          <ListElement
            titleId="personalia.civil_status"
            content={this.props.sivilstand ? this.props.sivilstand.kode : ''}
          />
          <ListElement
            titleId="personalia.security_measure"
            content={this.props.tiltak ? this.props.tiltak.type : ''}
          />
          <ListElement
            titleId="personalia.gender"
            content={this.props.kjonn}
          />
          <ListElement
            titleId="personalia.customized_comm"
            content="x"
          />
        </ul>
        <div className="box-footer">
          <FormattedMessage
            id="personalia.source"
          />
        </div>
      </Box>
    );
  }
}

Personalia.propTypes = {
  navn: PropTypes.shape({
    datoFraOgMed: PropTypes.string,
    forkortetNavn: PropTypes.string,
    fornavn: PropTypes.string,
    kilde: PropTypes.string,
    mellomnavn: PropTypes.string,
    slektsnavn: PropTypes.string,
    slektsnavnUgift: PropTypes.string,
  }).isRequired,
  ident: PropTypes.string.isRequired,
  statsborgerskap: PropTypes.shape({
    datoFraOgMed: PropTypes.string,
    kilde: PropTypes.string,
    kode: PropTypes.string,
  }).isRequired,
  status: PropTypes.shape({
    datoFraOgMed: PropTypes.string,
    kilde: PropTypes.string,
    kode: PropTypes.string,
  }).isRequired,
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
  }).isRequired,
  tiltak: PropTypes.shape({
    datoFraOgMed: PropTypes.string,
    datoTil: PropTypes.string,
    kilde: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
  kjonn: PropTypes.string.isRequired,
  spraak: PropTypes.shape({
    datoFraOgMed: PropTypes.string,
    kilde: PropTypes.string,
    kode: PropTypes.string,
  }).isRequired,
  sivilstand: PropTypes.shape({
    datoFraOgMed: PropTypes.string,
    kilde: PropTypes.string,
    kode: PropTypes.string,
  }).isRequired,
  kontonummer: PropTypes.shape({
    datoFraOgMed: PropTypes.string,
    kilde: PropTypes.string,
    nummer: PropTypes.string,
  }).isRequired,
  spesreg: PropTypes.shape({
    datoFraOgMed: PropTypes.string,
    kilde: PropTypes.string,
    kode: PropTypes.string,
  }).isRequired,
};

export default Personalia;
