import React from "react";
import { FormattedMessage } from "react-intl";
import { Normaltekst, Systemtittel } from "nav-frontend-typografi";
import veilederIkon from "assets/img/Veileder.svg";
import Veilederpanel from "nav-frontend-veilederpanel";
import Error from "components/error/Error";
import Spinner from "../4-personinfo/PersonInfo";
import { formatName } from "utils/text";
import { useStore } from "store/Context";
import Lenke from "nav-frontend-lenker";

const Header = () => {
  const [{ nameInfo }] = useStore();

  switch (nameInfo.status) {
    default:
    case "LOADING":
      return <Spinner />;
    case "RESULT":
      const { name } = nameInfo.data;
      const fornavn = name.split(" ")[0];
      const Veileder = (
        <img src={veilederIkon} className="header__ikon" alt="Veileder" />
      );

      return (
        <div className="header">
          <Veilederpanel svg={Veileder} type={"plakat"} kompakt={true}>
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
                        <Lenke
                          href="/personvern"
                          target="blank"
                          rel="noopener noreferrer"
                        >
                          {text}
                        </Lenke>
                      ),
                    }}
                  />
                </Normaltekst>
              </div>
            </div>
          </Veilederpanel>
        </div>
      );
    case "ERROR":
      return <Error error={nameInfo.error} />;
  }
};
export default Header;
