import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Box from 'js/components/Box';
import hus from '../../../assets/img/hus.png';
import ListElement from '../ListElement';

class BoAdresse extends Component {
  render() {
    return (
      <Box
        header="Adresse"
        icon={hus}
        infoType="adresse"
        smallMargin
      >
        <div className="address-box">
          <h3 className="address-type">Bostedsadresse</h3>
          <ul className="address-list-col-4">
            <ListElement
              className="address-col"
              titleId="adresse.gate"
              content={this.props.adresse}
            />
            <ListElement
              className="address-col"
              titleId="adresse.postnummer"
              content={this.props.postnummer}
            />
            <ListElement
              className="address-col"
              titleId="adresse.poststed"
              content={this.props.poststed}
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

BoAdresse.propTypes = {
  adresse: PropTypes.string,
  postnummer: PropTypes.string,
  poststed: PropTypes.string,
};

BoAdresse.defaultProps = {
  adresse: '',
  postnummer: '',
  poststed: '',
};

export default BoAdresse;
