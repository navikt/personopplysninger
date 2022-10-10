import React from "react";
import { Alert } from "@navikt/ds-react";

export interface HTTPError {
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
      <Alert variant="error">
        Oisann, noe gikk galt ved henting av data!
        <br />
        {error.code && <span>{`${error.code}: `}</span>}
        {error.text && <span>{`${error.text}`}</span>}
      </Alert>
    </div>
  );
};

export default Error;
