import React from "react";
import Box from "../../components/box/Box";
import { ListeMedArbeidsforhold } from "@navikt/arbeidsforhold";
import arbeidsforholdIkon from "../../assets/img/arbeidsforhold.svg";
import Kilde from "../../components/kilde/Kilde";
import { Undertekst } from "nav-frontend-typografi";
import {FormattedHTMLMessage} from "react-intl"

const Arbeidsforhold = () => {
  const onClick = (arbeidsforholdId: string) => {
    console.log(arbeidsforholdId)
  }

  return (
    <Box
      id="adresse"
      tittel="arbeidsforhold.tittel"
      beskrivelse="arbeidsforhold.beskrivelse"
      icon={arbeidsforholdIkon}
    >
      <hr className="box__linje-bred" />
      <ListeMedArbeidsforhold onClick={onClick}  />
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
}
export default Arbeidsforhold;
