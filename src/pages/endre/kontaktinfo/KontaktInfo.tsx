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

const EndreKontaktInformasjon = (props: RouteComponentProps<Routes>) => (
  <MedPersonInfo>
    {({ personalia }) => (
      <div className="endreOpplysninger__container">
        <Brodsmulesti hierarki={[{ title: "side.endre.alle.opplysninger" }]} />
        {personalia && (
          <Box
            id="kontaktinformasjon"
            tittel="kontaktinfo.tittel"
            icon={kontaktIkon}
          >
            <PDLTelefonnummerHosNav tlfnr={personalia.tlfnr} />
          </Box>
        )}
        {props.match.params.tjeneste && (
          <RedirectKnapp tjeneste={props.match.params.tjeneste} />
        )}
      </div>
    )}
  </MedPersonInfo>
);

export default withRouter(EndreKontaktInformasjon);
