import React, { MouseEvent } from "react";
import { DetaljertArbeidsforhold } from "@navikt/arbeidsforhold";
import Environment from "../../utils/Environments";
import { withRouter, RouteComponentProps } from "react-router";
import { VenstreChevron } from "nav-frontend-chevron";
import { HashLink as Link } from "react-router-hash-link";
import { baseUrl } from "../../App";
import Brodsmulesti from "../forside/sections/2-brodsmulesti/Brodsmulesti";
import Icon from "../../components/icon/Icon";
import arbeidsforholdIkon from "../../assets/img/arbeidsforhold.svg";
import { Systemtittel } from "nav-frontend-typografi";
import { FormattedMessage } from "react-intl";

const environment = Environment();
const miljo = environment.miljo as "LOCAL" | "DEV" | "PROD";

interface Routes {
  id: string;
}

const radix = 10;
const Arbeidsforhold = ({ match, history }: RouteComponentProps<Routes>) => {
  const id: number = parseInt(match.params.id, radix);

  const goBack = (event: MouseEvent): void => {
    event.preventDefault();
    history.goBack();
  };

  return (
    <div className="da__container">
      <Brodsmulesti />
      <div className="da__icon">
        <Icon backgroundImage={arbeidsforholdIkon} backgroundColor="#99C1E9" />
      </div>
      <div className="da__back">
        <Link to={`${baseUrl}/`} onClick={goBack} className="lenke">
          <VenstreChevron />
          Tilbake
        </Link>
      <div className="da__rad">
        <div className="da__back">
          <Link to={`${baseUrl}/`} onClick={goBack}>
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
      <div className="da__innhold">
        <DetaljertArbeidsforhold miljo={miljo} navArbeidsforholdId={id} />
      </div>
    </div>
  );
};

export default withRouter(Arbeidsforhold);
