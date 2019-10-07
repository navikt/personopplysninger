import React from "react";
import RedirectKnapp from "components/knapper/Redirect";
import { withRouter, RouteComponentProps } from "react-router";
import Brodsmulesti from "../../forside/sections/2-brodsmulesti/Brodsmulesti";
import MedPersonInfo from "../../../providers/personinfo/PersinInfo";
import VisAdresser from "../../forside/sections/4-personinfo/3-adresser/Adresser";

interface Routes {
  tjeneste?: string;
}

const EndreAdresser = (props: RouteComponentProps<Routes>) => (
  <MedPersonInfo>
    {({ adresser }) => (
      <div className="endreOpplysninger__container">
        <Brodsmulesti hierarki={[{ title: "side.endre.adresser" }]} />
        {adresser && <VisAdresser adresser={adresser} />}
        {props.match.params.tjeneste && (
          <RedirectKnapp tjeneste={props.match.params.tjeneste} />
        )}
      </div>
    )}
  </MedPersonInfo>
);

export default withRouter(EndreAdresser);
