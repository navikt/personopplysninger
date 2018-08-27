import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Box extends Component {
  render() {
    return (
      <div className="BoxContainer">
        <div className="BoxWithHeader">
          <h1>{this.props.header}</h1>
          <div className="icon-box-wrapper">
            {this.props.icon ? <img src={this.props.icon} alt="" className="box-icon" /> : null}
            <div className="Box">
              {this.props.children}
            </div>
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
  icon: PropTypes.string,
};

Box.defaultProps = {
  children: [],
  header: '',
  icon: '',
};

export default Box;
