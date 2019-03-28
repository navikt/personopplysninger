import * as React from "react";
import { Normaltekst } from "nav-frontend-typografi";

interface Props {
  adresse1?: string;
  adresse2?: string;
  adresse3?: string;
}

const GateAdresse = ({ adresse1, adresse2, adresse3 }: Props) => (
  <>
    {adresse1 && (
      <div className="adresse__linje">
        <Normaltekst>{adresse1}</Normaltekst>
      </div>
    )}
    {adresse2 && (
      <div className="adresse__linje">
        <Normaltekst>{adresse2}</Normaltekst>
      </div>
    )}
    {adresse3 && (
      <div className="adresse__linje">
        <Normaltekst>{adresse3}</Normaltekst>
      </div>
    )}
  </>
);
export default GateAdresse;
