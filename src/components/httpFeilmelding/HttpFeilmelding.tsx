import React from "react";
import { HTTPError } from "components/error/Error";
import { Alert, AlertProps } from "@navikt/ds-react";
import { useIntl } from "react-intl";

type FeilmeldingType = "advarsel" | "info" | "feil";

export interface Feilmelding extends HTTPError {
  type: FeilmeldingType;
}

type AlertVariant = { [key in FeilmeldingType]: AlertProps["variant"] };

const HttpFeilmelding = (props: Feilmelding) => {
  const { formatMessage, messages } = useIntl();

  const alertVarianter: AlertVariant = {
    advarsel: "warning",
    info: "info",
    feil: "error",
  };

  const variant = alertVarianter[props.type] || alertVarianter.info;
  const text =
    props.text in messages ? formatMessage({ id: props.text }) : props.text;
  return (
    <div className="error__container">
      <Alert variant={variant}>{text && <span>{text}</span>}</Alert>
    </div>
  );
};

export default HttpFeilmelding;
