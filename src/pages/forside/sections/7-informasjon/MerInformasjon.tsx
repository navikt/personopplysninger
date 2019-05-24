import React from "react";
import { Innholdstittel } from "nav-frontend-typografi";
import { FormattedMessage } from "react-intl";
import MerInformasjonPanel from "./MerInformasjonPanel";
import merInformasjon from "./MerInformasjonData";

const AlternativListe = () => (
  <div className="alternativer__box box-bottom-margin">
    <div className="alternativer__tittel-container">
      <Innholdstittel>
        <FormattedMessage id="alternativer.tittel" />
      </Innholdstittel>
    </div>
    <div className="icon-box-margin">
      {merInformasjon.map(info => (
        <MerInformasjonPanel
          key={info.id}
          tittel={info.tittel}
          melding={info.melding}
        />
      ))}
    </div>
  </div>
);

export default AlternativListe;
