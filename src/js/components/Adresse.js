import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Box from 'js/components/Box';
import { FormattedMessage } from 'react-intl';

class Adresse extends Component {
  render() {
    return (
      <Box>
        <div className="address-box">
          {this.props.type ? <h3 className="address-type">{this.props.type}</h3> : null}
          <ul className="address-list">
            <li className="address-col">
              <span className="title"><FormattedMessage
                id="adresse.gate"
              />
              </span>
              <span className="content">Vardeveien 7</span>
            </li>
            <li className="address-col">
              <span className="title"><FormattedMessage
                id="adresse.postnummer"
              />
              </span>
              <span className="content">5002</span>
            </li>
            <li className="address-col">
              <span className="title"><FormattedMessage
                id="adresse.poststed"
              />
              </span>
              <span className="content">Kristiansand</span>
            </li>
          </ul>
          <div className="box-footer">
            Kilde: Folkeregisteret
          </div>
        </div>
      </Box>
    );
  }
}

Adresse.propTypes = {
  type: PropTypes.string,
};

Adresse.defaultProps = {
  type: '',
};

export default Adresse;
