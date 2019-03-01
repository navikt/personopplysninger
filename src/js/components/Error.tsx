import React from "react";
import PropTypes from "prop-types";
import AlertStripe from "nav-frontend-alertstriper";

const Error = (props: any) => {
  const { error } = props;
  return (
    <div className="BoxContainer">
      <AlertStripe type="advarsel" solid>
        Oisann, noe gikk galt!
        <span>{` ${error.code}: ${error.text}`}</span>
      </AlertStripe>
    </div>
  );
};

Error.propTypes = {
  error: PropTypes.shape({
    code: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired
};

export default Error;
