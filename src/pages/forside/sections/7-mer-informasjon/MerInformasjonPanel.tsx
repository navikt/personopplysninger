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
    <>
      <button
        className="mi__button"
        onClick={() => settVisBeskrivelse(!visBeskrivelse)}
        aria-expanded={visBeskrivelse}
      >
        <Normaltekst className="lenke mi__lenke">
          <FormattedMessage id={tittel} />
        </Normaltekst>
      </button>
      {visBeskrivelse && (
        <Normaltekst>
          <FormattedHTMLMessage id={melding} />
        </Normaltekst>
      )}
    </>
  );
};

export default injectIntl(Alternativ);
