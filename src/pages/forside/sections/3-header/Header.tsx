import React, { useEffect, useState } from "react";
import { FormattedHTMLMessage } from "react-intl";
import { Normaltekst, Systemtittel } from "nav-frontend-typografi";
import veilederIkon from "../../../../assets/img/Veileder.svg";
import Veilederpanel from "nav-frontend-veilederpanel";
import { fetchAuthInfo } from "../../../../clients/apiClient";
import { AuthInfo } from "../../../../types/authInfo";
import Error, { HTTPError } from "../../../../components/error/Error";
import Spinner from "../4-personinfo/PersonInfo";
import { formatName } from "../../../../utils/text";

export type FetchAuthInfo =
  | { status: "LOADING" }
  | { status: "RESULT"; data: AuthInfo }
  | { status: "ERROR"; error: HTTPError };

const Header = () => {
  const [authInfo, settAuthInfo] = useState({
    status: "LOADING"
  } as FetchAuthInfo);

  useEffect(() => {
    if (authInfo.status === "LOADING") {
      fetchAuthInfo()
        .then(personInfo =>
          settAuthInfo({ status: "RESULT", data: personInfo as AuthInfo })
        )
        .catch((error: HTTPError) =>
          settAuthInfo({ status: "ERROR", error: error })
        );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  switch (authInfo.status) {
    default:
    case "LOADING":
      return <Spinner />;
    case "RESULT":
      const { name } = authInfo.data;
      const fornavn = name.split(" ")[0];

      return (
        <Veilederpanel
          svg={
            <img src={veilederIkon} className="header__ikon" alt="Veileder" />
          }
          type={"plakat"}
          kompakt
        >
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
        </Veilederpanel>
      );
    case "ERROR":
      return <Error error={authInfo.error} />;
  }
};
export default Header;
