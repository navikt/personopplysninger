import React from "react";
import NavFrontendSpinner from "nav-frontend-spinner";
import { Undertittel } from "nav-frontend-typografi";

const Spinner = () => (
  <div className="spinner-wrapper">
    <Undertittel>{"Laster innhold..."}</Undertittel>
    <NavFrontendSpinner type="XL" />
  </div>
);

export default Spinner;
