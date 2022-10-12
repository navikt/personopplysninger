import React from "react";
import { Undertittel } from "nav-frontend-typografi";
import { Loader } from "@navikt/ds-react";

type Props = {
  text?: string;
};

const Spinner = ({ text = "Laster innhold..." }: Props) => (
  <div className="spinner-wrapper">
    <Undertittel>{text}</Undertittel>
    <Loader type="xlarge" />
  </div>
);

export default Spinner;
