import React, { Fragment } from "react";
import { Systemtittel } from "nav-frontend-typografi";
import { FormattedMessage } from "react-intl";
import MerInformasjonPanel from "./MerInformasjonPanel";
import merInformasjon from "./MerInformasjonData";
import PanelBase from "nav-frontend-paneler";

const AlternativListe = () => (
  <PanelBase border={true} className="el__panel">
    <div className="mi__content">
      <div className="mi__overskrift">
        <Systemtittel>
          <FormattedMessage id="alternativer.tittel" />
        </Systemtittel>
      </div>
      {merInformasjon.map((info, i) => (
        <Fragment key={i}>
          <hr className="mi__line" />
          <MerInformasjonPanel
            key={info.id}
            tittel={info.tittel}
            melding={info.melding}
          />
        </Fragment>
      ))}
      <hr className="mi__line" />
    </div>
  </PanelBase>
);

export default AlternativListe;
