import React from "react";
import { FormattedMessage } from "react-intl";
import { Element, Normaltekst } from "nav-frontend-typografi";
import Hjelpetekst from "nav-frontend-hjelpetekst";

interface Props {
  title?: string;
  titleId?: string;
  hjelpetekstId?: string;
  content?: string | JSX.Element | null;
  children?: JSX.Element | JSX.Element[];
  className?: string;
}
const ListElement = (props: Props) => {
  const { content, title, titleId, hjelpetekstId, children, className } = props;
  return content ? (
    <li>
      <div className={"listelement__header"}>
        <Element>{titleId ? <FormattedMessage id={titleId} /> : title}</Element>
        {hjelpetekstId && (
          <Hjelpetekst>
            <FormattedMessage id={hjelpetekstId} />
          </Hjelpetekst>
        )}
      </div>
      <Normaltekst className={`content ${className || ""}`}>
        {content}
      </Normaltekst>
      {children}
    </li>
  ) : null;
};

export default ListElement;
