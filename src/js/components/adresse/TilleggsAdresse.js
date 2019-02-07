import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Box from 'js/components/Box';
import ListElement from '../ListElement';

class TilleggsAdresse extends Component {
  render() {
    const adresse = `a ${this.props.adresse1 ? this.props.adresse1 : ''}${this.props.adresse2 ? this.props.adresse2 : ''}${this.props.adresse3 ? this.props.adresse3 : ''}`;
    return (
      <Box smallMargin>
        <div className="address-box">
          <h3 className="address-type">Tilleggsadresse</h3>
          <ul className="list-column-3">
            {adresse ? <ListElement
              titleId="adresse.adresse"
              content={adresse}
            /> : null}
            {this.props.postnummer ? <ListElement
              titleId="adresse.postnummer"
              content={this.props.postnummer}
            /> : null}
            {this.props.land ? <ListElement
              titleId="adresse.land"
              content={this.props.land}
            /> : null}
          </ul>
        </div>
      </Box>
    );
  }
}

TilleggsAdresse.propTypes = {
  adresse1: PropTypes.string,
  adresse2: PropTypes.string,
  adresse3: PropTypes.string,
  land: PropTypes.string,
  postnummer: PropTypes.string,
};

TilleggsAdresse.defaultProps = {
  adresse1: '',
  adresse2: '',
  adresse3: '',
  land: '',
  postnummer: '',
};

export default TilleggsAdresse;
