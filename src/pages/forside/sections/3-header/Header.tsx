import React from "react";
import { FormattedHTMLMessage } from "react-intl";
import { Ingress, Normaltekst, Systemtittel } from "nav-frontend-typografi";
import veilederIkon from "../../../../assets/img/Veileder.svg";
import Veilederpanel from "nav-frontend-veilederpanel";

interface Props {
  fornavn?: string;
}

const Header = ({ fornavn }: Props) => (
  <Veilederpanel
    svg={<img src={veilederIkon} className="header__ikon" alt="Veileder" />}
    type={"plakat"}
    kompakt
  >
    <Systemtittel>
      <FormattedHTMLMessage
        id="header.hello"
        values={{ name: fornavn || "" }}
      />
    </Systemtittel>
    <div className="header__seksjon">
      <Normaltekst>
        <FormattedHTMLMessage id="header.obs" />
      </Normaltekst>
    </div>
    <div className="header__seksjon">
      <Normaltekst>
        <FormattedHTMLMessage id="header.description" />
      </Normaltekst>
    </div>
  </Veilederpanel>
);
export default Header;
