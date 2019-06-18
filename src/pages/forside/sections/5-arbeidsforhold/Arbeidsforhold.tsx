import React from "react";
import Box from "../../../../components/box/Box";
import { ListeMedArbeidsforhold } from "@navikt/arbeidsforhold";
import arbeidsforholdIkon from "../../../../assets/img/arbeidsforhold.svg";
import Kilde from "../../../../components/kilde/Kilde";
import { Undertekst } from "nav-frontend-typografi";
import { FormattedHTMLMessage } from "react-intl";
import Environment from "../../../../utils/Environments";
import { withRouter, RouteComponentProps } from "react-router";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { baseUrl } from "../../../../App";

const environment = Environment();
const miljo = environment.miljo as "LOCAL" | "DEV" | "PROD";

const Arbeidsforhold = (props: RouteComponentProps & InjectedIntlProps) => {
  const { intl, history } = props;

  const onClick = (navArbeidsforholdId: number) => {
    history.push(`${baseUrl}/arbeidsforhold/${navArbeidsforholdId}`);
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
          <ListeMedArbeidsforhold
            locale={intl.locale as "nb" | "en"}
            miljo={miljo}
            onClick={onClick}
          />
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
export default injectIntl(withRouter(Arbeidsforhold));
