import React from "react";
import PropTypes from "prop-types";

const InfoBox = props => {
  const { children } = props;
  return (
    <React.Fragment>
      <div className="BoxContainer">
        <div className="InfoBox">
          <hr width="32px" />
          {children}
        </div>
      </div>
    </React.Fragment>
  );
};

InfoBox.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

InfoBox.defaultProps = {
  children: []
};

export default InfoBox;
