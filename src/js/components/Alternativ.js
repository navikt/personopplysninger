/* eslint-disable react/no-danger */

import React from "react";
import Ekspanderbartpanel from "nav-frontend-ekspanderbartpanel";
import PropTypes from "prop-types";

const Alternativ = props => {
  const { description, content } = props;
  return (
    <React.Fragment>
      <Ekspanderbartpanel
        className="alternativ-panel"
        tittel={description}
        tittelProps="element"
      >
        <div dangerouslySetInnerHTML={content} />
      </Ekspanderbartpanel>
    </React.Fragment>
  );
};

Alternativ.propTypes = {
  description: PropTypes.string.isRequired,
  content: PropTypes.shape({
    __html: PropTypes.string.isRequired
  }).isRequired
};

export default Alternativ;
