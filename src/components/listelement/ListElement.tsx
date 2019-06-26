import React from "react";
import { FormattedMessage } from "react-intl";
import { Element, Normaltekst } from "nav-frontend-typografi";

interface Props {
  title?: string;
  titleId?: string;
  content?: string | JSX.Element;
  children?: JSX.Element | JSX.Element[];
  className?: string;
}
const ListElement = ({ title, titleId, content, className, children }: Props) =>
  content ? (
    <li>
      <Element>{titleId ? <FormattedMessage id={titleId} /> : title}</Element>
      <Normaltekst className={`content ${className || ""}`}>
        {content}
      </Normaltekst>
      {children}
    </li>
  ) : null;

export default ListElement;
