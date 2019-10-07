import React from "react";
import RedirectKnapp from "components/knapper/Redirect";
import { withRouter, RouteComponentProps } from "react-router";
import Brodsmulesti from "../../forside/sections/2-brodsmulesti/Brodsmulesti";
import MedPersonInfo from "../../../providers/personinfo/PersinInfo";
import Utbetalinger from "../../forside/sections/4-personinfo/4-utbetalinger/Utbetalinger";

interface Routes {
  tjeneste?: string;
}

const EndreKontaktInformasjon = (props: RouteComponentProps<Routes>) => (
  <MedPersonInfo>
    {({ personalia }) => (
      <div className="endreOpplysninger__container">
        <Brodsmulesti hierarki={[{ title: "side.endre.alle.opplysninger" }]} />
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

export default withRouter(EndreKontaktInformasjon);
