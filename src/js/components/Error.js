import React, { Component } from "react";
import PropTypes from "prop-types";
import AlertStripe from "nav-frontend-alertstriper";

class Error extends Component {
  render() {
    const { statusCode } = this.props;
    return (
      <div className="BoxContainer">
        <AlertStripe type="advarsel" solid>
          Oisann, noe gikk galt!
          {statusCode === 500 ? (
            <span> 500 Internal Server Error</span>
          ) : (
            statusCode
          )}
        </AlertStripe>
      </div>
    );
  }
}

Error.propTypes = {
  statusCode: PropTypes.number
};

Error.defaultProps = {
  statusCode: null
};

export default Error;
