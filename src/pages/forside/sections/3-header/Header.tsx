import React from "react";
import { FormattedMessage } from "react-intl";
import { Normaltekst, Systemtittel } from "nav-frontend-typografi";
import veilederIkon from "assets/img/Veileder.svg";
import Error from "components/error/Error";
import Spinner from "../4-personinfo/PersonInfo";
import { formatName } from "utils/text";
import { useStore } from "store/Context";
import { GuidePanel, Link } from "@navikt/ds-react";

const Header = () => {
  const [{ authInfo }] = useStore();

  switch (authInfo.status) {
    default:
    case "LOADING":
      return <Spinner />;
    case "RESULT":
      const { name } = authInfo.data;
      const fornavn = name.split(" ")[0];
      const Veileder = (
        <img src={veilederIkon} className="header__ikon" alt="Veileder" />
      );

      return (
        <div className="header">
          <GuidePanel illustration={Veileder} poster>
            <div className="box__container header__content">
              <Systemtittel>
                {fornavn ? (
                  <FormattedMessage
                    id="header.hello.name"
                    values={{ name: formatName(fornavn) }}
                  />
                ) : (
                  <FormattedMessage id="header.hello" />
                )}
              </Systemtittel>
              <div className="header__seksjon">
                <Normaltekst>
                  <FormattedMessage id="header.obs" />
                </Normaltekst>
              </div>
              <div className="header__seksjon">
                <Normaltekst>
                  <FormattedMessage
                    id="header.description"
                    values={{
                      a: (text: String) => (
                        <Link
                          href="/personvern"
                          target="blank"
                          rel="noopener noreferrer"
                        >
                          {text}
                        </Link>
                      ),
                    }}
                  />
                </Normaltekst>
              </div>
            </div>
          </GuidePanel>
        </div>
      );
    case "ERROR":
      return <Error error={authInfo.error} />;
  }
};
export default Header;
