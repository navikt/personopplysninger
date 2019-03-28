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
    <div className="kilde__seksjon">
      {props.kilde && (
        <Undertekst>
          <FormattedMessage id={props.kilde} />
        </Undertekst>
      )}
    </div>
    <div className="kilde__seksjon">
      {props.lenke && props.lenkeTekst && (
        <Lenke href={props.lenke}>
          <Normaltekst>
            <FormattedMessage id={props.lenkeTekst} />
          </Normaltekst>
        </Lenke>
      )}
    </div>
  </div>
);

export default Kilde;
