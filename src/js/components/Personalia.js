import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Box from 'js/components/Box';
import { FormattedMessage } from 'react-intl';
import woman from '../../assets/img/woman.png';

class Personalia extends Component {
  render() {
    return (
      <Box header="Personalia" icon={woman}>
        <ul className="personalia-list">
          <li>
            <span className="title"><FormattedMessage
              id="personalia.first_name"
            />
            </span>
            <span className="content">{this.props.navn.fornavn}</span>
          </li>
          <li>
            <span className="title"><FormattedMessage
              id="personalia.surname"
            />
            </span>
            <span className="content">{this.props.navn.slektsnavn}</span>
          </li>
          <li>
            <span className="title"><FormattedMessage
              id="personalia.fnr"
            />
            </span>
            <span className="content">{this.props.ident}</span>
          </li>
          <li>
            <span className="title"><FormattedMessage
              id="personalia.foreign_id"
            />
            </span>
            <span className="content">x</span>
          </li>
          <li>
            <span className="title"><FormattedMessage
              id="personalia.phone"
            />
            </span>
            <span className="content">{this.props.telefon.privat}</span>
          </li>
          <li>
            <span className="title"><FormattedMessage
              id="personalia.account_no"
            />
            </span>
            <span className="content">{this.props.kontonummer.nummer}</span>
          </li>
          <li>
            <span className="title"><FormattedMessage
              id="personalia.email"
            />
            </span>
            <span className="content">x</span>
          </li>
          <li>
            <span className="title"><FormattedMessage
              id="personalia.language"
            />
            </span>
            <span className="content">{this.props.spraak.kode}</span>
          </li>
          <li>
            <span className="title"><FormattedMessage
              id="personalia.citizenship"
            />
            </span>
            <span className="content">{this.props.statsborgerskap.kode}</span>
          </li>
          <li>
            <span className="title"><FormattedMessage
              id="personalia.status"
            />
            </span>
            <span className="content">{this.props.status.kode}</span>
          </li>
          <li>
            <span className="title"><FormattedMessage
              id="personalia.birthplace"
            />
            </span>
            <span className="content">x</span>
          </li>
          <li>
            <span className="title"><FormattedMessage
              id="personalia.spesreg"
            />
            </span>
            <span className="content">{this.props.spesreg.kode}</span>
          </li>
          <li>
            <span className="title"><FormattedMessage
              id="personalia.civil_status"
            />
            </span>
            <span className="content">{this.props.sivilstand.kode}</span>
          </li>
          <li>
            <span className="title"><FormattedMessage
              id="personalia.security_measure"
            />
            </span>
            <span className="content">{this.props.tiltak.type}</span>
          </li>
          <li>
            <span className="title"><FormattedMessage
              id="personalia.gender"
            />
            </span>
            <span className="content">{this.props.kjonn}</span>
          </li>
          <li>
            <span className="title"><FormattedMessage
              id="personalia.customized_comm"
            />
            </span>
            <span className="content">x</span>
          </li>
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
