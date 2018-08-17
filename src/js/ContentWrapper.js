import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Personalia from './components/Personalia';
import Adresse from './components/Adresse';
import Familierelasjoner from './components/Familierelasjoner';
import Arbeidsforhold from './components/Arbeidsforhold';

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
        />
        <Adresse />
        <Familierelasjoner />
        <Arbeidsforhold />
      </div>
    );
  }
}

export default ContentWrapper;

ContentWrapper.propTypes = {
  userInfo: PropTypes.shape.isRequired,
};
