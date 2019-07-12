import React from "react";
import { FormattedHTMLMessage } from "react-intl";
import { Normaltekst, Systemtittel } from "nav-frontend-typografi";
import veilederIkon from "../../../../assets/img/Veileder.svg";
import Veilederpanel from "nav-frontend-veilederpanel";
import Error from "../../../../components/error/Error";
import Spinner from "../4-personinfo/PersonInfo";
import { formatName } from "../../../../utils/text";
import { useStore } from "../../../../providers/Provider";

const Header = () => {
  const [{ auth }] = useStore();

  switch (auth.status) {
    default:
    case "LOADING":
      return <Spinner />;
    case "RESULT":
      if (auth.data.authenticated) {
        const { name } = auth.data;
        const fornavn = name.split(" ")[0];

        return (
          <Veilederpanel
            svg={
              <img src={veilederIkon} className="header__ikon" alt="Veileder" />
            }
            type={"plakat"}
            kompakt
          >
            <div className="box__container">
              <Systemtittel>
                <FormattedHTMLMessage
                  id="header.hello"
                  values={{ name: formatName(fornavn) || "" }}
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
            </div>
          </Veilederpanel>
        );
      } else {
        return null;
      }
    case "ERROR":
      return <Error error={auth.error} />;
  }
};
export default Header;
