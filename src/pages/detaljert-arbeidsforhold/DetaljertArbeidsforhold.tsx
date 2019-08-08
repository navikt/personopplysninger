import React, { MouseEvent, useEffect } from "react";
import { DetaljertArbeidsforhold } from "@navikt/arbeidsforhold";
import Environment from "../../utils/Environments";
import { withRouter, RouteComponentProps } from "react-router";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { VenstreChevron } from "nav-frontend-chevron";
import { HashLink as Link } from "react-router-hash-link";
import { basePath } from "../../App";
import Icon from "../../components/icon/Icon";
import arbeidsforholdIkon from "../../assets/img/Arbeidsforhold.svg";
import { Systemtittel } from "nav-frontend-typografi";
import { FormattedMessage } from "react-intl";
import PanelBase from "nav-frontend-paneler";
import Brodsmulesti from "../forside/sections/2-brodsmulesti/Brodsmulesti";

const environment = Environment();
const miljo = environment.miljo as "LOCAL" | "DEV" | "PROD";

interface Routes {
  id: string;
}

const radix = 10;
type MergedProps = RouteComponentProps<Routes> & InjectedIntlProps;
const Arbeidsforhold = (props: MergedProps) => {
  const { match, history, intl } = props;
  const id: number = parseInt(match.params.id, radix);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const goBack = (event: MouseEvent): void => {
    event.preventDefault();
    history.goBack();
  };

  return (
    <>
      <Brodsmulesti hierarchy={[{ title: "arbeidsforhold.tittel" }]} />
      <div className="da__container">
        <div className="da__icon">
          <Icon
            backgroundImage={arbeidsforholdIkon}
            backgroundColor="#99C1E9"
          />
        </div>
        <div className="da__rad">
          <div className="da__back">
            <Link to={`${basePath}/`} onClick={goBack}>
              <VenstreChevron />
              Tilbake
            </Link>
          </div>
          <div className="da__overskrift">
            <Systemtittel>
              <FormattedMessage id="arbeidsforhold.tittel" />
            </Systemtittel>
          </div>
          <div className="da__filler" />
        </div>
        <PanelBase border={true} className="da__innhold">
          <DetaljertArbeidsforhold
            locale={intl.locale as "nb" | "en"}
            miljo={miljo}
            navArbeidsforholdId={id}
          />
        </PanelBase>
      </div>
    </>
  );
};

export default injectIntl(withRouter(Arbeidsforhold));
