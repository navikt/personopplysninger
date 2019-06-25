import React from "react";
import { FormattedMessage } from "react-intl";
import { Undertekst, Normaltekst } from "nav-frontend-typografi";
import Lenke from "nav-frontend-lenker";

interface Props {
  kilde?: string;
  lenke?: string;
  lenkeTekst?: string;
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
    <div className="kilde__seksjon kilde__lenke">
      {props.lenke && props.lenkeTekst && (
        <Normaltekst>
          <Lenke href={props.lenke}>
            <FormattedMessage id={props.lenkeTekst} />
          </Lenke>
        </Normaltekst>
      )}
    </div>
  </div>
);

export default Kilde;
