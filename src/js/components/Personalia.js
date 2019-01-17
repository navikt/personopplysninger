/* eslint-disable */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Box from 'js/components/Box';
import { FormattedMessage } from 'react-intl';
import kvinne from '../../assets/img/kvinne.png';
import mann from '../../assets/img/rsz_mann.png';
import ListElement from './ListElement';

class Personalia extends Component {
  render() {
    // TODO: Finn ut hvordan flere telefonnr skal vises
    const phoneKeys = ['jobb', 'mobil', 'privat'];

    let phoneList = '';

    if (this.props.tlfnr) {
      phoneKeys.forEach((key) => {
        if (this.props.tlfnr[key]) {
          phoneList += this.props.tlfnr[key] + ", ";
        }
      });
    }

    const personidentHeader = this.props.personident.type === 'DNR' ? 'personalia.dnr' : 'personalia.fnr';

    return (
      <Box
        header="Personalia"
        icon={this.props.kjoenn === 'Mann' ? mann : kvinne}
        infoType="personalia"
      >
        <ul className="personalia-list">
          <ListElement
            titleId="personalia.first_name"
            content={this.props.fornavn}
          />
          <ListElement
            titleId={personidentHeader}
            content={this.props.personident.verdi}
          />
          <ListElement
            titleId="personalia.phone"
            content="TODO"
          />
          <ListElement
            titleId="personalia.email"
            content={this.props.epostadr}
          />
          <ListElement
            titleId="personalia.citizenship"
            content={this.props.statsborgerskap}
          />
          <ListElement
            titleId="personalia.civil_status"
            content={this.props.sivilstand}
          />
          <ListElement
            classNameContent="capitalize"
            titleId="personalia.surname"
            content={this.props.etternavn}
          />
          <ListElement
            titleId="personalia.account_no"
            content={this.props.kontonr}
          />
          <ListElement
            titleId="personalia.language"
            content={this.props.spraak}
          />
          <ListElement
            titleId="personalia.status"
            content={this.props.personstatus}
          />
          <ListElement
            titleId="personalia.birthplace"
            content={this.props.foedested}
          />
          <ListElement
            titleId="personalia.gender"
            content={this.props.kjoenn}
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
  // datakilder: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  epostadr: PropTypes.string,
  etternavn: PropTypes.string,
  personident: PropTypes.shape({
    verdi: PropTypes.string,
    type: PropTypes.string,
  }),
  foedested: PropTypes.string,
  fornavn: PropTypes.string,
  kjoenn: PropTypes.string,
  kontonr: PropTypes.string,
  personstatus: PropTypes.string,
  sivilstand: PropTypes.string,
  spraak: PropTypes.string,
  statsborgerskap: PropTypes.string,
  tlfnr: PropTypes.shape({
    jobb: PropTypes.string,
    mobil: PropTypes.string,
    privat: PropTypes.string,
    datakilder: PropTypes.arrayOf(PropTypes.shape({})),
  }),
};

Personalia.defaultProps = {
  fornavn: '',
  etternavn: '',
  personident: {
    verdi: '',
    type: '',
  },
  kontonr: '',
  tlfnr: {
    jobb: '',
    mobil: '',
    privat: '',
    // datakilder: [{}],
  },
  spraak: '',
  epostadr: '',
  personstatus: '',
  statsborgerskap: '',
  foedested: '',
  sivilstand: '',
  kjoenn: '',
  // datakilder: [{}],
};

export default Personalia;
