import * as React from "react";
import { Undertittel } from "nav-frontend-typografi";
import { FormattedMessage } from "react-intl";

interface Props {
  tittel: string;
  children: JSX.Element | JSX.Element[];
}

const AdressePanel = (props: Props) => (
  <div className="addresse__box">
    <Undertittel>
      <FormattedMessage id={props.tittel} />
    </Undertittel>
    {props.children}
    <hr className="box__linje-bred" />
  </div>
);
export default AdressePanel;
