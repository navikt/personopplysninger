import * as React from "react";
import { Element } from "nav-frontend-typografi";
import { FormattedMessage } from "react-intl";

interface Props {
  tittel: string;
  children: JSX.Element | JSX.Element[];
}

const AdressePanel = (props: Props) => (
  <div className="adresse__box">
    <div className="underseksjon__header">
      <Element>
        <FormattedMessage id={props.tittel} />
      </Element>
    </div>
    {props.children}
  </div>
);
export default AdressePanel;
