import React from "react";
import Box from "../../../../components/box/Box";
import { ListeMedArbeidsforhold, AFListeOnClick } from "@navikt/arbeidsforhold";
import arbeidsforholdIkon from "../../../../assets/img/Arbeidsforhold.svg";
import { EtikettLiten } from "nav-frontend-typografi";
import { FormattedHTMLMessage, FormattedMessage } from "react-intl";
import Environment from "../../../../utils/Environments";
import { withRouter, RouteComponentProps } from "react-router";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { Link } from "react-router-dom";
import { basePath } from "../../../../App";
import { AlertStripeInfo } from "nav-frontend-alertstriper";

const environment = Environment();
const miljo = environment.miljo as "LOCAL" | "DEV" | "PROD";

const Arbeidsforhold = (props: RouteComponentProps & InjectedIntlProps) => {
  const { intl } = props;

  const onClick = {
    type: "REACT_ROUTER_LENKE",
    Component: Link,
    to: `${basePath}/arbeidsforhold/{id}`
  } as AFListeOnClick;

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
          <AlertStripeInfo>
            <FormattedHTMLMessage id="arbeidsforhold.disclaimer" />
          </AlertStripeInfo>
        </div>
        <div className="kilde__container">
          <div className="arbeidsforhold__kilde">
            <EtikettLiten>
              <FormattedMessage id="arbeidsforhold.kilde" />
            </EtikettLiten>
          </div>
        </div>
        <EtikettLiten>
          <span className="arbeidsforhold__arbeidsgiver">
            <FormattedMessage id="arbeidsforhold.submitted.by" />
          </span>
        </EtikettLiten>
      </Box>
    </div>
  );
};
export default injectIntl(withRouter(Arbeidsforhold));
