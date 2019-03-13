import * as React from "react";
import { FormattedMessage } from "react-intl";
import { Element, Normaltekst } from "nav-frontend-typografi";

interface Props {
  adresse1?: string;
  adresse2?: string;
  adresse3?: string;
}

const GateAdresse = ({ adresse1, adresse2, adresse3 }: Props) => (
  <li>
    <Element>
      <FormattedMessage id="adresse.adresse" />
    </Element>
    {adresse1 && <Normaltekst>{adresse1}</Normaltekst>}
    {adresse2 && <Normaltekst>{adresse2}</Normaltekst>}
    {adresse3 && <Normaltekst>{adresse3}</Normaltekst>}
  </li>
);
export default GateAdresse;
