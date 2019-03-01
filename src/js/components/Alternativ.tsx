/* eslint-disable react/no-danger */

import React from "react";
import Ekspanderbartpanel from "nav-frontend-ekspanderbartpanel";
import PropTypes from "prop-types";
import { Normaltekst } from "nav-frontend-typografi";

const Alternativ = (props: any) => {
  const { description, content } = props;
  return (
    <React.Fragment>
      <Ekspanderbartpanel tittel={description} tittelProps="element">
        <Normaltekst>
          <div dangerouslySetInnerHTML={content} />
        </Normaltekst>
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
