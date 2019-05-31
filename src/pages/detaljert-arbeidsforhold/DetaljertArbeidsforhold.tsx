import React, { MouseEvent } from "react";
import { DetaljertArbeidsforhold } from "@navikt/arbeidsforhold";
import Environment from "../../utils/Environments";
import { withRouter, RouteComponentProps } from "react-router";
import { VenstreChevron } from "nav-frontend-chevron";
import { HashLink as Link } from "react-router-hash-link";
import { baseUrl } from "../../App";
import Brodsmulesti from "../forside/sections/2-brodsmulesti/Brodsmulesti";

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
      <div className="da__back">
        <Link to={`${baseUrl}/`} onClick={goBack}>
          <VenstreChevron />
          Tilbake
        </Link>
      </div>
      <div className="da__innhold">
        <DetaljertArbeidsforhold miljo={miljo} navArbeidsforholdId={id} />
      </div>
    </div>
  );
};

export default withRouter(Arbeidsforhold);
