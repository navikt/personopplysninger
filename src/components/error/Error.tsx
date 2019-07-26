import React from "react";
import { AlertStripeFeil } from "nav-frontend-alertstriper";

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
      <AlertStripeFeil>
        Oisann, noe gikk galt ved henting av data!
        <br />
        <span>{` ${error.code}: ${error.text}`}</span>
      </AlertStripeFeil>
    </div>
  );
};

export default Error;
