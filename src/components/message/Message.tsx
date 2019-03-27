import React from "react";
import { FormattedMessage } from "react-intl";
import { Normaltekst } from "nav-frontend-typografi";

interface Props {
  messageId: string;
}

const Message = (props: Props) => (
  <div className="message">
    <Normaltekst>
      <b>
        <FormattedMessage id={props.messageId} />
      </b>
    </Normaltekst>
  </div>
);

export default Message;
