import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Box from 'js/components/Box';
import ListElement from '../ListElement';

class UtenlandskAdresse extends Component {
  render() {
    return (
      <Box>
        <div className="address-box">
          <h3 className="address-type">Utenlandsk adresse</h3>
          <ul className="address-list-col-3">
            <ListElement
              className="address-col"
              titleId="adresse.adresse1"
              content={this.props.adresse1}
            />
            <ListElement
              className="address-col"
              titleId="adresse.adresse2"
              content={this.props.adresse2}
            />
            <ListElement
              className="address-col"
              titleId="adresse.adresse3"
              content={this.props.adresse3}
            />
          </ul>
          <div className="box-footer">
            <FormattedMessage
              id="adresse.source"
            />
          </div>
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
