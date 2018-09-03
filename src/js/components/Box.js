import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Box extends Component {
  render() {
    const marginClass = this.props.smallMargin ? 'box-bottom-margin-small' : 'box-bottom-margin';

    return (
      <div className={`BoxContainer ${marginClass}`}>
        <div className="BoxWithHeader">
          {this.props.header ? <h1>{this.props.header}</h1> : null}
          <div className="icon-box-wrapper">
            {this.props.icon ? <img src={this.props.icon} alt="" className="box-icon" /> : <div className="box-icon" />}
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
  smallMargin: PropTypes.bool,
};

Box.defaultProps = {
  children: [],
  header: '',
  icon: '',
  smallMargin: false,
};

export default Box;
