import React from "react";
import { BodyShort, Loader } from "@navikt/ds-react";

type Props = {
  text?: string;
};

const Spinner = ({ text = "Laster innhold..." }: Props) => (
  <div className="spinner-wrapper">
    <BodyShort size="small">{text}</BodyShort>
    <Loader type="xlarge" />
  </div>
);

export default Spinner;
