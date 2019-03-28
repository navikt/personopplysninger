import React from "react";
import AlertStripe from "nav-frontend-alertstriper";

export interface HTTPError {
  code: string;
  text: string;
}

interface props {
  error: HTTPError;
}

const Error = (props: props) => {
  const { error } = JSON.parse(JSON.stringify(props));

  return (
    <div className="error__container">
      <AlertStripe type="advarsel" solid>
        Oisann, noe gikk galt!
        <span>{` ${error.code}: ${error.text}`}</span>
      </AlertStripe>
    </div>
  );
};

export default Error;
