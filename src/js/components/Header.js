import React from "react";
import { FormattedHTMLMessage } from "react-intl";
import PropTypes from "prop-types";
import { Undertittel } from "nav-frontend-typografi";
import group from "../../assets/img/group.png";
import woman from "../../assets/img/forfra.png";

const Header = props => {
  const { fornavn } = props;
  return (
    <div className="Header">
      <div className="header-content">
        <div className="header-content-wrapper">
          <h1 className="header-text">
            <FormattedHTMLMessage
              id="header.hello"
              values={{ name: fornavn }}
            />
          </h1>
          <div className="header-intro">
            <Undertittel>
              <FormattedHTMLMessage
                id="header.intro"
                values={{ name: fornavn }}
              />
            </Undertittel>
          </div>
          <div className="header-description">
            <FormattedHTMLMessage id="header.description" />
          </div>
          <div className="snakkeboble-edge" />
        </div>
        <img src={group} className="header-icon-desktop" alt="Pc" />
        <div className="header-icon-mobile-wrapper">
          <img src={woman} className="header-icon-mobile" alt="Pc" />
        </div>
      </div>
    </div>
  );
};

Header.propTypes = {
  fornavn: PropTypes.string
};

Header.defaultProps = {
  fornavn: ""
};

export default Header;
