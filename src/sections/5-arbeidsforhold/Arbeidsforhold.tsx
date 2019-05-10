import React from "react";
import Box from "../../components/box/Box";
import NavArbeidsforhold from "@navikt/arbeidsforhold";
import arbeidsforholdIkon from "../../assets/img/arbeidsforhold.svg";

const Arbeidsforhold = () => (
  <Box
    id="adresse"
    tittel="arbeidsforhold.tittel"
    beskrivelse="arbeidsforhold.beskrivelse"
    icon={arbeidsforholdIkon}
  >
    <NavArbeidsforhold />
  </Box>
);
export default Arbeidsforhold;
