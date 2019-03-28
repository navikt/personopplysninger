import React from "react";
import { FormattedMessage } from "react-intl";
import { Undertekst, Normaltekst } from "nav-frontend-typografi";
import Lenke from "nav-frontend-lenker";

interface Props {
  kilde?: string;
  lenke: string;
  lenkeTekst: string;
}

const Kilde = (props: Props) => (
  <div className="kilde__container">
    {props.kilde && (
      <Undertekst>
        <FormattedMessage id={props.kilde} />
      </Undertekst>
    )}
    {props.lenke && props.lenkeTekst && (
      <Lenke href={props.lenke}>
        <Normaltekst>
          <FormattedMessage id={props.lenkeTekst} />
        </Normaltekst>
      </Lenke>
    )}
  </div>
);

export default Kilde;
