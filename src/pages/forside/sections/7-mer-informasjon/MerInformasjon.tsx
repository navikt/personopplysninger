import React, { Fragment } from "react";
import { Systemtittel } from "nav-frontend-typografi";
import { FormattedMessage } from "react-intl";
import MerInformasjonPanel from "./MerInformasjonPanel";
import merInformasjon from "./MerInformasjonData";
import PanelBase from "nav-frontend-paneler";

const AlternativListe = () => (
  <PanelBase className="el__panel">
    <div className="mi__content">
      <div className="mi__overskrift">
        <Systemtittel>
          <FormattedMessage id="alternativer.tittel" />
        </Systemtittel>
      </div>
      {merInformasjon.map((info, i) => (
        <Fragment key={i}>
          <MerInformasjonPanel
            key={info.id}
            tittel={info.tittel}
            melding={info.melding}
          />
        </Fragment>
      ))}
    </div>
  </PanelBase>
);

export default AlternativListe;
