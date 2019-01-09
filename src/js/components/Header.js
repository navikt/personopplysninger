import React, { Component } from 'react';
import { FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';
import group from '../../assets/img/group.png';

class Header extends Component {
  render() {
    return (
      <div className="Header">
        <h1 className="header-text">Dine personopplysninger</h1>
        <div className="header-content">
          <div className="snakkeboble-wrapper">
            <div className="snakkeboble">
              <FormattedHTMLMessage
                id="header.intro"
                values={{ name: this.props.fornavn }}
              />
            </div>
            <div className="snakkeboble-edge" />
          </div>
          <img src={group} className="header-pc-icon" alt="Pc" />
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  fornavn: PropTypes.string,
};

Header.defaultProps = {
  fornavn: '',
};

export default Header;
