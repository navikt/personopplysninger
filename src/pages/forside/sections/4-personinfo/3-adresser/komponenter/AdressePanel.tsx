import * as React from "react";
import { Undertittel } from "nav-frontend-typografi";
import { FormattedMessage } from "react-intl";

interface Props {
  tittel: string;
  children: JSX.Element | JSX.Element[];
}

const AdressePanel = (props: Props) => (
  <div className="addresse__box">
    <div className="underseksjon__header">
      <Undertittel>
        <FormattedMessage id={props.tittel} />
      </Undertittel>
    </div>
    {props.children}
  </div>
);
export default AdressePanel;
