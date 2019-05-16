import React from "react";
import Box from "../../components/box/Box";
import { ListeMedArbeidsforhold } from "@navikt/arbeidsforhold";
import arbeidsforholdIkon from "../../assets/img/arbeidsforhold.svg";
import Kilde from "../../components/kilde/Kilde";
import { Undertekst } from "nav-frontend-typografi";
import { FormattedHTMLMessage } from "react-intl";
import Environment from "../../utils/Environments";

const environment = Environment();
const miljo = environment.miljo as "LOCAL" | "DEV" | "PROD";

const Arbeidsforhold = () => {
  const onClick = (arbeidsforholdId: string) => {
    console.log(arbeidsforholdId);
  };

  return (
    <Box
      id="adresse"
      tittel="arbeidsforhold.tittel"
      beskrivelse="arbeidsforhold.beskrivelse"
      icon={arbeidsforholdIkon}
    >
      <div className="arbeidsforhold">
        <ListeMedArbeidsforhold miljo={miljo} onClick={onClick} />
      </div>
      <div className="arbeidsforhold__disclaimer">
        <Undertekst>
          <FormattedHTMLMessage id="arbeidsforhold.disclaimer" />
        </Undertekst>
      </div>
      <Kilde kilde="arbeidsforhold.kilde" />
    </Box>
  );
};
export default Arbeidsforhold;
