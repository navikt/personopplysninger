import React, { Component } from 'react';
import Personalia from './components/Personalia';
import Adresse from './components/Adresse';
import Familierelasjoner from './components/Familierelasjoner';
import Arbeidsforhold from './components/Arbeidsforhold';

class ContentWrapper extends Component {
  render() {
    return (
      <div>
        <Personalia />
        <Adresse />
        <Familierelasjoner />
        <Arbeidsforhold />
      </div>
    );
  }
}

export default ContentWrapper;
