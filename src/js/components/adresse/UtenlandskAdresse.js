import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Box from 'js/components/Box';
import ListElement from '../ListElement';

class UtenlandskAdresse extends Component {
  render() {
    const adresse = `${this.props.adresse1 ? this.props.adresse1 : ''}${this.props.adresse2 ? this.props.adresse2 : ''}${this.props.adresse3 ? this.props.adresse3 : ''}`;
    return (
      <Box>
        <div className="address-box">
          <h3 className="address-type">Utenlandsk adresse</h3>
          <ul className="list-column-1">
            {adresse ? <ListElement
              titleId="adresse.adresse"
              content={adresse}
            /> : null}
          </ul>
        </div>
      </Box>
    );
  }
}

UtenlandskAdresse.propTypes = {
  adresse1: PropTypes.string,
  adresse2: PropTypes.string,
  adresse3: PropTypes.string,
};

UtenlandskAdresse.defaultProps = {
  adresse1: '',
  adresse2: '',
  adresse3: '',
};

export default UtenlandskAdresse;
