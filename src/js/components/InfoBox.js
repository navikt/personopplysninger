import React, { Component } from 'react';
import PropTypes from 'prop-types';


class InfoBox extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="BoxContainer">
          <div className="InfoBox">
            <hr width="32px" />
            {this.props.children}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

InfoBox.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

InfoBox.defaultProps = {
  children: [],
};

export default InfoBox;
