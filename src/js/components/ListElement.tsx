import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import { Element, Normaltekst } from "nav-frontend-typografi";

const ListElement = ({
  className,
  title,
  titleId,
  content,
  classNameTitle,
  classNameContent
}: any) => (
  <li className={className}>
    <Element className={`title ${classNameTitle}`}>
      {titleId ? <FormattedMessage id={titleId} /> : title}
    </Element>
    <Normaltekst className={`content ${classNameContent}`}>
      {content}
    </Normaltekst>
  </li>
);

ListElement.propTypes = {
  title: PropTypes.string,
  titleId: PropTypes.string,
  content: PropTypes.string,
  className: PropTypes.string,
  classNameTitle: PropTypes.string,
  classNameContent: PropTypes.string
};

ListElement.defaultProps = {
  title: "",
  titleId: "",
  content: "",
  className: "",
  classNameTitle: "",
  classNameContent: ""
};

export default ListElement;
