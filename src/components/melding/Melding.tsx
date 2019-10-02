import React from "react";
import { FormattedHTMLMessage } from "react-intl";
import { Normaltekst } from "nav-frontend-typografi";

interface Props {
  meldingId: string;
  bold?: boolean;
}

const Message = (props: Props) => (
  <div className="underseksjon__beskrivelse">
    <Normaltekst>
      {props.bold ? (
        <b>
          <FormattedHTMLMessage id={props.meldingId} />
        </b>
      ) : (
        <FormattedHTMLMessage id={props.meldingId} />
      )}
    </Normaltekst>
  </div>
);

export default Message;
