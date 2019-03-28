import React from "react";
import { FormattedMessage } from "react-intl";
import { Undertekst, Normaltekst } from "nav-frontend-typografi";
import Lenke from "nav-frontend-lenker";

interface Props {
  tekst: string;
  lenkeTekst: string;
  href: string;
}

const Kilde = (props: Props) => (
  <div className="kilde__container">
    <Undertekst>
      <FormattedMessage id={props.tekst} />
    </Undertekst>
    {props.href && props.lenkeTekst && (
      <Lenke href={props.href}>
        <Normaltekst>
          <FormattedMessage id={props.lenkeTekst} />
        </Normaltekst>
      </Lenke>
    )}
  </div>
);

export default Kilde;
