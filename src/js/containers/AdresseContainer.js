/* eslint-disable */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'less/index.less';
import HovedAdresse from '../components/HovedAdresse';
import Adresse from '../components/Adresse';

class AdresseContainer extends Component {

  render() {
    console.log(this.props.adresseInfo);

    const postAdresseContentKeys = Object.keys(this.props.adresseInfo.postadresse).map((str) => 'postadresse.' + str);

    console.log(postAdresseContentKeys);

    return (
      <div>
        <HovedAdresse />
        {this.props.adresseInfo.postadresse ?
          <Adresse
            type="Postadresse"
            adresse={this.props.adresseInfo.postadresse}
          /> : null}
      </div>
    );
  }
}

AdresseContainer.propTypes = {
  adresseInfo: PropTypes.shape({}).isRequired,
};

export default AdresseContainer;
