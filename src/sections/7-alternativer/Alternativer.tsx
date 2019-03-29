import React from "react";
import { Innholdstittel } from "nav-frontend-typografi";
import { FormattedMessage } from "react-intl";
import Alternativ from "./Alternativ";
import merInformasjon from "./AlternativerData";

const AlternativListe = () => (
  <React.Fragment>
    <div className="alternativer__box box-bottom-margin">
      <div className="alternativer__tittel-container">
        <Innholdstittel>
          <FormattedMessage id="alternativer.tittel" />
        </Innholdstittel>
      </div>
      <div className="icon-box-margin">
        {merInformasjon.map(info => (
          <Alternativ
            key={info.id}
            tittel={info.tittel}
            melding={info.melding}
          />
        ))}
      </div>
    </div>
  </React.Fragment>
);

export default AlternativListe;
