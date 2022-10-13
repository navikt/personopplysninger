import React, { Fragment } from "react";
import { FormattedMessage } from "react-intl";
import MerInformasjonPanel from "./MerInformasjonPanel";
import merInformasjon from "./MerInformasjonData";
import { Heading, Panel } from "@navikt/ds-react";

const AlternativListe = () => (
  <Panel className="el__panel">
    <div className="mi__content">
      <div className="mi__overskrift">
        <Heading size={"medium"} level={"2"}>
          <FormattedMessage id="alternativer.tittel" />
        </Heading>
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
  </Panel>
);

export default AlternativListe;
