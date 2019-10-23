import React from "react";
import Adresser from "pages/forside/sections/4-personinfo/3-adresser/Adresser-PDL";
import Utbetalinger from "../forside/sections/4-personinfo/4-utbetalinger/Utbetalinger";
import Box from "components/box/Box";
import kontaktIkon from "assets/img/Kontakt.svg";
import RedirectKnapp from "components/knapper/Redirect";
import { withRouter, RouteComponentProps } from "react-router";
import PDLTelefonnummerHosNav from "../forside/sections/4-personinfo/2-kontaktinfo/subsections/TelefonnummerHosNav-PDL";
import MedPersonInfo from "../../providers/personinfo/PersinInfo";
import Spinner from "../../components/spinner/Spinner";

interface Routes {
  tjeneste?: string;
  redirectUrl?: string;
}

const EndreAlleOpplysninger = (props: RouteComponentProps<Routes>) => {
  const { tjeneste, redirectUrl } = props.match.params;
  return (
    <div className="endreOpplysninger__page">
      <div className="endreOpplysninger__container pagecontent">
        {tjeneste && redirectUrl && (
          <RedirectKnapp tjeneste={tjeneste} redirectUrl={redirectUrl} />
        )}
        <MedPersonInfo loader={<Spinner />}>
          {({ personalia, adresser }) => {
            return (
              <>
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
              </>
            );
          }}
        </MedPersonInfo>
      </div>
    </div>
  );
};

export default withRouter(EndreAlleOpplysninger);
