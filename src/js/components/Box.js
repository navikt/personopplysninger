import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Box extends Component {
  render() {
    return (
      <div className="BoxContainer">
        <div className="Box">
          {this.props.children}
        </div>
      </div>
    );
  }
}

Box.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

Box.defaultProps = {
  children: [],
};

export default Box;
