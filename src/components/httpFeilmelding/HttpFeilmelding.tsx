import React from "react";
import { HTTPError } from "components/error/Error";
import { Alert, AlertProps } from "@navikt/ds-react";

type FeilmeldingType = "advarsel" | "info" | "feil";
export interface Feilmelding extends HTTPError {
  type: FeilmeldingType;
}

type AlertVariant = { [key in FeilmeldingType]: AlertProps["variant"] };

const HttpFeilmelding = (props: Feilmelding) => {
  const alertVarianter: AlertVariant = {
    advarsel: "warning",
    info: "info",
    feil: "error",
  };

  const variant = alertVarianter[props.type] || alertVarianter.info;

  return (
    <div className="error__container">
      <Alert variant={variant}>
        {props.text && <span>{`${props.text}`}</span>}
      </Alert>
    </div>
  );
};

export default HttpFeilmelding;
