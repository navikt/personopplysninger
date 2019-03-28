import React from "react";
import { FormattedMessage } from "react-intl";
import { Element, Normaltekst } from "nav-frontend-typografi";

interface Props {
  title?: string;
  titleId?: string;
  content?: string;
  className?: string;
}
const ListElement = ({ title, titleId, content, className }: Props) =>
  content ? (
    <li>
      <Element>{titleId ? <FormattedMessage id={titleId} /> : title}</Element>
      <Normaltekst className={`content ${className || ""}`}>
        {content}
      </Normaltekst>
    </li>
  ) : null;

export default ListElement;
