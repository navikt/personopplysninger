import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Box from 'js/components/Box';
import { FormattedMessage } from 'react-intl';

class UtenlandskAdresse extends Component {
  render() {
    return (
      <Box>
        <div className="address-box">
          <h3 className="address-type">Utenlandsk adresse</h3>
          <ul className="address-list-col-3">
            <li className="address-col">
              <span className="title"><FormattedMessage
                id="adresse.adresse1"
              />
              </span>
              <span className="content">{this.props.adresse1}</span>
            </li>
            <li className="address-col">
              <span className="title"><FormattedMessage
                id="adresse.adresse2"
              />
              </span>
              <span className="content">{this.props.adresse2}</span>
            </li>
            <li className="address-col">
              <span className="title"><FormattedMessage
                id="adresse.adresse3"
              />
              </span>
              <span className="content">{this.props.adresse3}</span>
            </li>
          </ul>
          <div className="box-footer">
          Kilde: {this.props.kilde}
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
  kilde: PropTypes.string,
};

UtenlandskAdresse.defaultProps = {
  adresse1: '',
  adresse2: '',
  adresse3: '',
  kilde: '',
};

export default UtenlandskAdresse;
