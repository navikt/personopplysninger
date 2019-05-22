import React from "react";
import { FormattedHTMLMessage } from "react-intl";
import { Ingress, Innholdstittel, Normaltekst } from "nav-frontend-typografi";
import veilederDesktop from "../../../../assets/img/veileder-desktop.svg";
import veilederMobil from "../../../../assets/img/veileder-mobile.svg";

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
      <div className="header__content-seksjon">
        <Ingress>
          <FormattedHTMLMessage
            id="header.intro"
            values={{ name: fornavn || "" }}
          />
        </Ingress>
      </div>
      <div className="header__content-seksjon">
        <Normaltekst>
          <FormattedHTMLMessage id="header.obs" />
        </Normaltekst>
      </div>
      <div className="header__content-seksjon">
        <Ingress>
          <FormattedHTMLMessage id="header.description" />
        </Ingress>
      </div>
    </div>
    <img src={veilederDesktop} className="header__icon-desktop" alt="PC" />
    <div className="header__icon-mobile-container">
      <img src={veilederMobil} className="header__icon-mobile" alt="PC" />
    </div>
  </div>
);
export default Header;
