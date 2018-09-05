import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Box from 'js/components/Box';
import { FormattedMessage } from 'react-intl';

class PostAdresse extends Component {
  render() {
    return (
      <Box smallMargin>
        <div className="address-box">
          <h3 className="address-type">Postadresse</h3>
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
            <li className="address-col">
              <span className="title"><FormattedMessage
                id="adresse.postnummer"
              />
              </span>
              <span className="content">{this.props.postnummer}</span>
            </li>
            <li className="address-col">
              <span className="title"><FormattedMessage
                id="adresse.land"
              />
              </span>
              <span className="content">{this.props.land}</span>
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
