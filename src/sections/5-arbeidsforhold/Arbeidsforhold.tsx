import React from "react";
import Box from "../../components/box/Box";
import NavArbeidsforhold from "@navikt/arbeidsforhold";
import arbeidsforholdIkon from "../../assets/img/arbeidsforhold.svg";
import Kilde from "../../components/kilde/Kilde";
import { Undertekst } from "nav-frontend-typografi";
import {FormattedHTMLMessage} from "react-intl"

const Arbeidsforhold = () => (
  <Box
    id="adresse"
    tittel="arbeidsforhold.tittel"
    beskrivelse="arbeidsforhold.beskrivelse"
    icon={arbeidsforholdIkon}
  >
    <hr className="box__linje-bred" />
    <NavArbeidsforhold />
    <div className="arbeidsforhold__disclaimer">
      <Undertekst>
        <FormattedHTMLMessage id="arbeidsforhold.disclaimer" />
      </Undertekst>
    </div>
    <Kilde
      kilde="arbeidsforhold.kilde"
    />
  </Box>
);
export default Arbeidsforhold;
