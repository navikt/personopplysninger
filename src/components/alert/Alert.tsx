import React from "react";
import AlertStripe, { AlertStripeType } from "nav-frontend-alertstriper";
import { HTTPError } from "../error/Error";

export interface AlertType extends HTTPError {
  type: AlertStripeType;
  overskrift?: string;
}

const Alert = (props: AlertType) => {
  return (
    <div className="error__container">
      <AlertStripe type={props.type}>
        {props.overskrift || "Oisann, noe gikk galt!"}
        <br />
        {props.text && <span>{`${props.text}`}</span>}
      </AlertStripe>
    </div>
  );
};

export default Alert;
