import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Error extends Component {
  render() {
    return (
      <div className="BoxContainer">
        <div>Error {this.props.statusCode}</div>
      </div>
    );
  }
}

Error.propTypes = {
  statusCode: PropTypes.number,
};

Error.defaultProps = {
  statusCode: null,
};

export default Error;
