import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Box from 'js/components/Box';
import ListElement from '../ListElement';

class PostAdresse extends Component {
  render() {
    const adresse = `a ${this.props.adresse1 ? this.props.adresse1 : ''}${this.props.adresse2 ? this.props.adresse2 : ''}${this.props.adresse3 ? this.props.adresse3 : ''}`;
    return (
      <Box smallMargin>
        <div className="address-box">
          <h3 className="address-type">Postadresse</h3>
          <ul className="address-list-col-3">
            <ListElement
              className="address-col"
              titleId="adresse.adresse"
              content={adresse}
            />
            <ListElement
              className="address-col"
              titleId="adresse.postnummer"
              content={this.props.postnummer}
            />
            <ListElement
              className="address-col"
              titleId="adresse.land"
              content={this.props.land}
            />
          </ul>
          <div className="box-footer">
            Kilde: {this.props.kilde}
          </div>
        </div>
      </Box>
    );
  }
}

PostAdresse.propTypes = {
  adresse1: PropTypes.string,
  adresse2: PropTypes.string,
  adresse3: PropTypes.string,
  kilde: PropTypes.string,
  land: PropTypes.string,
  postnummer: PropTypes.string,
};

PostAdresse.defaultProps = {
  adresse1: '',
  adresse2: '',
  adresse3: '',
  kilde: '',
  land: '',
  postnummer: '',
};

export default PostAdresse;
