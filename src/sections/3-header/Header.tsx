import React from "react";
import { FormattedHTMLMessage } from "react-intl";
import { Ingress, Innholdstittel } from "nav-frontend-typografi";
import group from "../../assets/img/group.svg";
import veileder from "../../assets/img/veileder.svg";

interface Props {
  fornavn?: string;
}

const Header = ({ fornavn }: Props) => (
  <div className="header">
    <div className="header__content">
      <Innholdstittel>
        <FormattedHTMLMessage
          id="header.hello"
          values={{ name: fornavn || "" }}
        />
      </Innholdstittel>
      <div className="header__content-intro">
        <Ingress>
          <FormattedHTMLMessage
            id="header.intro"
            values={{ name: fornavn || "" }}
          />
        </Ingress>
      </div>
      <div className="header__content-description">
        <Ingress>
          <FormattedHTMLMessage id="header.description" />
        </Ingress>
      </div>
    </div>
    <img src={group} className="header__icon-desktop" alt="PC" />
    <div className="header__icon-mobile-container">
      <img src={veileder} className="header__icon-mobile" alt="PC" />
    </div>
  </div>
);
export default Header;
