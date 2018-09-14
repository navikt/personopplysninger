import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

const ListElement = ({
  className, title, titleId, content,
}) => (
  <li className={className}>
    <span className="title">{titleId ? <FormattedMessage
      id={titleId}
    /> : title}
    </span>
    <span className="content">{content}</span>
  </li>
);

ListElement.propTypes = {
  title: PropTypes.string,
  titleId: PropTypes.string,
  content: PropTypes.string,
  className: PropTypes.string,
};

ListElement.defaultProps = {
  title: '',
  titleId: '',
  content: '',
  className: '',
};

export default ListElement;
