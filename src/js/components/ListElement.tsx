import React from "react";
import { FormattedMessage } from "react-intl";
import { Element, Normaltekst } from "nav-frontend-typografi";

interface Props {
  title?: string;
  titleId?: string;
  content: string;
  className?: string;
  classNameTitle?: string;
  classNameContent?: string;
}
const ListElement = ({
  className,
  title,
  titleId,
  content,
  classNameTitle,
  classNameContent
}: Props) => (
  <li className={className}>
    <Element className={`title ${classNameTitle}`}>
      {titleId ? <FormattedMessage id={titleId} /> : title}
    </Element>
    <Normaltekst className={`content ${classNameContent}`}>
      {content}
    </Normaltekst>
  </li>
);

export default ListElement;
