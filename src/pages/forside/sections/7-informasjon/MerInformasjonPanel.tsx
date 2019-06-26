import React, { useState } from "react";
import { Normaltekst } from "nav-frontend-typografi";
import {
  FormattedHTMLMessage,
  FormattedMessage,
  injectIntl,
  InjectedIntlProps
} from "react-intl";

interface Props {
  tittel: string;
  melding: string;
}
const Alternativ = (props: Props & InjectedIntlProps) => {
  const { tittel, melding } = props;
  const [visBeskrivelse, settVisBeskrivelse] = useState(false);
  return (
    <div
      className="mi__rad"
      onClick={() => settVisBeskrivelse(!visBeskrivelse)}
    >
      <div className="lenke">
        <Normaltekst>
          <FormattedMessage id={tittel} />
        </Normaltekst>
      </div>
      {visBeskrivelse && (
        <Normaltekst>
          <FormattedHTMLMessage id={melding} />
        </Normaltekst>
      )}
    </div>
  );
};

export default injectIntl(Alternativ);
