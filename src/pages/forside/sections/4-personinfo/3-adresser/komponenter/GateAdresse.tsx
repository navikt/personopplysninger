import * as React from "react";
import { BodyShort } from "@navikt/ds-react";

interface Props {
  adresse1?: string;
  adresse2?: string;
  adresse3?: string;
}

const GateAdresse = ({ adresse1, adresse2, adresse3 }: Props) => (
  <>
    {adresse1 && (
      <div className="adresse__linje">
        <BodyShort>{adresse1}</BodyShort>
      </div>
    )}
    {adresse2 && (
      <div className="adresse__linje">
        <BodyShort>{adresse2}</BodyShort>
      </div>
    )}
    {adresse3 && (
      <div className="adresse__linje">
        <BodyShort>{adresse3}</BodyShort>
      </div>
    )}
  </>
);
export default GateAdresse;
