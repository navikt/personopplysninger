import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";

const ListElement = ({
  className,
  title,
  titleId,
  content,
  classNameTitle,
  classNameContent
}) => (
  <li className={className}>
    <span className={`title ${classNameTitle}`}>
      {titleId ? <FormattedMessage id={titleId} /> : title}
    </span>
    <span className={`content ${classNameContent}`}>{content}</span>
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
