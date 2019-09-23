import React from "react";
import AlertStripe, { AlertStripeType } from "nav-frontend-alertstriper";

export interface AlertType {
  type?: AlertStripeType;
  message: string;
}

const Alert = (props: AlertType) => {
  return (
    <div className="error__container">
      <AlertStripe type={props.type || "feil"}>
        Oisann, noe gikk galt!
        <br />
        <span>{`${props.message}`}</span>
      </AlertStripe>
    </div>
  );
};

export default Alert;
