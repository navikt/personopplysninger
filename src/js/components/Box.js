import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Box extends Component {
  render() {
    return (
      <div className="BoxContainer">
        <div className="BoxWithHeader">
          <h1>{this.props.header}</h1>
          <div className="Box">
            {this.props.children}
          </div>
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
  header: PropTypes.string,
};

Box.defaultProps = {
  children: [],
  header: '',
};

export default Box;
