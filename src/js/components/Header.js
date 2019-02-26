import React from "react";
import { FormattedHTMLMessage } from "react-intl";
import PropTypes from "prop-types";
import { Ingress, Innholdstittel } from "nav-frontend-typografi";
import group from "../../assets/img/group.svg";
import veileder from "../../assets/img/veilder.svg";

const Header = props => {
  const { fornavn } = props;
  return (
    <div className="Header">
      <div className="header-content">
        <div className="header-content-wrapper">
          <Innholdstittel>
            <FormattedHTMLMessage
              id="header.hello"
              values={{ name: fornavn }}
            />
          </Innholdstittel>
          <div className="header-intro">
            <Ingress>
              <FormattedHTMLMessage
                id="header.intro"
                values={{ name: fornavn }}
              />
            </Ingress>
          </div>
          <div className="header-description">
            <Ingress>
              <FormattedHTMLMessage id="header.description" />
            </Ingress>
          </div>
          <div className="snakkeboble-edge" />
        </div>
        <img src={group} className="header-icon-desktop" alt="Pc" />
        <div className="header-icon-mobile-container">
          <div className="header-icon-mobile-circle">
            <img src={veileder} className="header-icon-mobile" alt="Pc" />
          </div>
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
