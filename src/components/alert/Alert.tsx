import React from "react";
import AlertStripe, { AlertStripeType } from "nav-frontend-alertstriper";
import { HTTPError } from "components/error/Error";

export interface AlertType extends HTTPError {
  type: AlertStripeType;
}

const Alert = (props: AlertType) => {
  return (
    <div className="error__container">
      <AlertStripe type={props.type}>
        {props.text && <span>{`${props.text}`}</span>}
      </AlertStripe>
    </div>
  );
};

export default Alert;
