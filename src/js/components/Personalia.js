import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Box from 'js/components/Box';

class Personalia extends Component {
  render() {
    return (
      <Box header="Personalia">
        <ul className="personalia-list">
          <li>
            <span className="title">Fornavn</span>
            <span className="content">{this.props.navn.fornavn}</span>
          </li>
          <li>
            <span className="title">Etternavn</span>
            <span className="content">{this.props.navn.slektsnavn}</span>
          </li>
          <li>
            <span className="title">Fødselsnummer</span>
            <span className="content">{this.props.ident}</span>
          </li>
          <li>
            <span className="title">Utenlandsk ID</span>
            <span className="content">x</span>
          </li>
          <li>
            <span className="title">Telefon</span>
            <span className="content">{this.props.telefon.privat}</span>
          </li>
          <li>
            <span className="title">Kontonummer</span>
            <span className="content">{this.props.kontonummer.nummer}</span>
          </li>
          <li>
            <span className="title">e-post</span>
            <span className="content">x</span>
          </li>
          <li>
            <span className="title">Språk</span>
            <span className="content">{this.props.spraak.kode}</span>
          </li>
          <li>
            <span className="title">Statsborgerskap</span>
            <span className="content">{this.props.statsborgerskap.kode}</span>
          </li>
          <li>
            <span className="title">Personstatus</span>
            <span className="content">{this.props.status.kode}</span>
          </li>
          <li>
            <span className="title">Fødested</span>
            <span className="content">x</span>
          </li>
          <li>
            <span className="title">Spesialregistrering</span>
            <span className="content">x</span>
          </li>
          <li>
            <span className="title">Sivilstand</span>
            <span className="content">{this.props.sivilstand.kode}</span>
          </li>
          <li>
            <span className="title">Sikkerhetstiltak</span>
            <span className="content">{this.props.tiltak.type}</span>
          </li>
          <li>
            <span className="title">Kjønn</span>
            <span className="content">{this.props.kjonn}</span>
          </li>
          <li>
            <span className="title">Tilpasset kommunikasjon</span>
            <span className="content">x</span>
          </li>
        </ul>
        <div className="box-footer">
          Kilde: NAV, Skatteetaten, Folkeregisteret, Kontakt- og reservasjonsregisteret
        </div>
      </Box>
    );
  }
}

Personalia.propTypes = {
  navn: PropTypes.shape.isRequired,
  ident: PropTypes.string.isRequired,
  statsborgerskap: PropTypes.shape.isRequired,
  status: PropTypes.shape.isRequired,
  telefon: PropTypes.shape.isRequired,
  tiltak: PropTypes.shape.isRequired,
  kjonn: PropTypes.string.isRequired,
  spraak: PropTypes.shape.isRequired,
  sivilstand: PropTypes.shape.isRequired,
  kontonummer: PropTypes.shape.isRequired,
};

export default Personalia;
