import React, { useEffect } from "react";
import { useStore } from "providers/Provider";
import { fetchPersonInfo } from "clients/apiClient";
import { PersonInfo } from "types/personInfo";
import Error, { HTTPError } from "components/error/Error";
import Spinner from "components/spinner/Spinner";
import Adresser from "pages/forside/sections/4-personinfo/3-adresser/Adresser-PDL";
import Utbetalinger from "../../forside/sections/4-personinfo/4-utbetalinger/Utbetalinger";
import Box from "components/box/Box";
import kontaktIkon from "assets/img/Kontakt.svg";
import RedirectKnapp from "components/knapper/Redirect";
import { withRouter, RouteComponentProps } from "react-router";
import PDLTelefonnummerHosNav from "../../forside/sections/4-personinfo/2-kontaktinfo/subsections/TelefonnummerHosNav-PDL";
import Brodsmulesti from "../../forside/sections/2-brodsmulesti/Brodsmulesti";

interface Routes {
  tjeneste?: string;
}

const KontaktInformasjon = (props: RouteComponentProps<Routes>) => {
  const [{ personInfo }, dispatch] = useStore();
  const { params } = props.match;

  useEffect(() => {
    if (personInfo.status === "LOADING") {
      fetchPersonInfo()
        .then(personInfo =>
          dispatch({
            type: "SETT_PERSON_INFO_RESULT",
            payload: personInfo as PersonInfo
          })
        )
        .catch((error: HTTPError) =>
          dispatch({ type: "SETT_PERSON_INFO_ERROR", payload: error })
        );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  switch (personInfo.status) {
    default:
    case "LOADING":
      return <Spinner />;
    case "RESULT":
      const { personalia, adresser } = personInfo.data;
      return (
        <div className="kontaktInfo__container">
          <Brodsmulesti hierarki={[{ title: "side.endre" }]} />
          {personalia && (
            <Box
              id="kontaktinformasjon"
              tittel="kontaktinfo.tittel"
              icon={kontaktIkon}
            >
              <PDLTelefonnummerHosNav tlfnr={personalia.tlfnr} />
            </Box>
          )}
          {adresser && <Adresser adresser={adresser} />}
          {personalia && (
            <Utbetalinger
              kontonr={personalia.kontonr}
              utenlandskbank={personalia.utenlandskbank}
            />
          )}
          {params.tjeneste && <RedirectKnapp tjeneste={params.tjeneste} />}
        </div>
      );
    case "ERROR":
      return <Error error={personInfo.error} />;
  }
};

export default withRouter(KontaktInformasjon);
