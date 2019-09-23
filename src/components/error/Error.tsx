import React from "react";
import AlertStripe, { AlertStripeType } from "nav-frontend-alertstriper";

export interface HTTPError {
  type?: AlertStripeType;
  code: number;
  text: string;
}

interface Props {
  error: HTTPError;
}

const Error = (props: Props) => {
  const { error } = props;
  return (
    <div className="error__container">
      <AlertStripe type={error.type || "feil"}>
        Oisann, noe gikk galt ved henting av data!
        <br />
        <span>{` ${error.code}: ${error.text}`}</span>
      </AlertStripe>
    </div>
  );
};

export default Error;
