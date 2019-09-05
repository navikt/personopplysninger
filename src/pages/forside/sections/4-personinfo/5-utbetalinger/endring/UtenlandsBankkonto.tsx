import React from "react";
import { AlertStripeInfo } from "nav-frontend-alertstriper";

interface Props {
  onChangeSuccess: (kontonummer: string) => void;
}

const OpprettEllerEndreUtlandskontonr = (props: Props) => {
  return <AlertStripeInfo>Under utvikling</AlertStripeInfo>;
};

export default OpprettEllerEndreUtlandskontonr;
