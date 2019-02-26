import React, { Component } from "react";
import { FormattedHTMLMessage } from "react-intl";
import PropTypes from "prop-types";
import { Undertittel } from "nav-frontend-typografi";
import group from "../../assets/img/group.png";

class Header extends Component {
  render() {
    const { fornavn } = this.props;
    return (
      <div className="Header">
        <h1 className="header-text">
          <FormattedHTMLMessage id="header.hello" values={{ name: fornavn }} />
        </h1>
        <div className="header-content">
          <div className="snakkeboble-wrapper">
            <div className="snakkeboble">
              <Undertittel>
                <FormattedHTMLMessage
                  id="header.intro"
                  values={{ name: fornavn }}
                />
              </Undertittel>
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
  fornavn: PropTypes.string
};

Header.defaultProps = {
  fornavn: ""
};

export default Header;
