import React, { createRef, Ref, useEffect } from "react";
import Box from "../../../../components/box/Box";
import { ListeMedArbeidsforhold } from "@navikt/arbeidsforhold";
import arbeidsforholdIkon from "../../../../assets/img/arbeidsforhold.svg";
import Kilde from "../../../../components/kilde/Kilde";
import { Undertekst } from "nav-frontend-typografi";
import { FormattedHTMLMessage } from "react-intl";
import Environment from "../../../../utils/Environments";
import { withRouter, RouteComponentProps } from "react-router";
import { baseUrl } from "../../../../App";

const environment = Environment();
const miljo = environment.miljo as "LOCAL" | "DEV" | "PROD";

const Arbeidsforhold = (props: RouteComponentProps) => {
  const onClick = (navArbeidsforholdId: number) => {
    props.history.push(`${baseUrl}/arbeidsforhold/${navArbeidsforholdId}`);
  };

  return (
    <div id="arbeidsforhold">
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
    </div>
  );
};
export default withRouter(Arbeidsforhold);
