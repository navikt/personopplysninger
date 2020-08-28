import React, { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { Normaltekst, Systemtittel } from "nav-frontend-typografi";
import veilederIkon from "assets/img/Veileder.svg";
import Veilederpanel from "nav-frontend-veilederpanel";
import Error from "components/error/Error";
import Spinner from "../4-personinfo/PersonInfo";
import { formatName } from "utils/text";
import { useStore } from "store/Context";
import Lenke from "nav-frontend-lenker";
import { NameInfo } from "types/nameInfo";
import { AlertType } from "components/alert/Alert";
import { fetchNavn } from "clients/apiClient";

const Header = () => {
  const [{ nameInfo }, dispatch] = useStore();

  useEffect(() => {
    if (nameInfo.status === "LOADING") {
      fetchNavn()
        .then((result: NameInfo) => {
          dispatch({ type: "SETT_NAME_RESULT", payload: result });
        })
        .catch((error: AlertType) => {
          if (error.code !== 401 && error.code !== 403) {
            dispatch({ type: "SETT_NAME_ERROR", payload: error });
          }
        });
    }
  }, [nameInfo, dispatch]);

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
                          href="https://www.nav.no/personvern"
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
