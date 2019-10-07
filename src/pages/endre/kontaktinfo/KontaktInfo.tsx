import React from "react";
import Adresser from "pages/forside/sections/4-personinfo/3-adresser/Adresser-PDL";
import Utbetalinger from "../../forside/sections/4-personinfo/4-utbetalinger/Utbetalinger";
import Box from "components/box/Box";
import kontaktIkon from "assets/img/Kontakt.svg";
import RedirectKnapp from "components/knapper/Redirect";
import { withRouter, RouteComponentProps } from "react-router";
import PDLTelefonnummerHosNav from "../../forside/sections/4-personinfo/2-kontaktinfo/subsections/TelefonnummerHosNav-PDL";
import Brodsmulesti from "../../forside/sections/2-brodsmulesti/Brodsmulesti";
import MedPersonInfo from "../../../providers/personinfo/PersinInfo";

interface Routes {
  tjeneste?: string;
}

const KontaktInformasjon = (props: RouteComponentProps<Routes>) => (
  <MedPersonInfo>
    {({ personalia, adresser }) => (
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
        {props.match.params.tjeneste && (
          <RedirectKnapp tjeneste={props.match.params.tjeneste} />
        )}
      </div>
    )}
  </MedPersonInfo>
);

export default withRouter(KontaktInformasjon);
