import React, { useState } from "react";
import { Normaltekst } from "nav-frontend-typografi";
import { FormattedMessage } from "react-intl";

interface Props {
  tittel: string;
  melding: string;
}
const Alternativ = (props: Props) => {
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
          <FormattedMessage id={melding} />
        </Normaltekst>
      )}
    </>
  );
};

export default Alternativ;
