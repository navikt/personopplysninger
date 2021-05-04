import React from "react";
import NavFrontendSpinner from "nav-frontend-spinner";
import { Undertittel } from "nav-frontend-typografi";

type Props = {
  text?: string;
};

const Spinner = ({ text = "Laster innhold..." }: Props) => (
  <div className="spinner-wrapper">
    <Undertittel>{text}</Undertittel>
    <NavFrontendSpinner type="XL" />
  </div>
);

export default Spinner;
