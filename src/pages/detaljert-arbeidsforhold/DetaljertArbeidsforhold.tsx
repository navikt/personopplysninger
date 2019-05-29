import React from "react";
import { DetaljertArbeidsforhold } from "@navikt/arbeidsforhold";
import Environment from "../../utils/Environments";
import { withRouter, RouteComponentProps } from "react-router";
import { VenstreChevron } from "nav-frontend-chevron";
import { HashLink as Link } from "react-router-hash-link";
import { baseUrl } from "../../App";

const environment = Environment();
const miljo = environment.miljo as "LOCAL" | "DEV" | "PROD";

interface Routes {
  id: string;
}

const Arbeidsforhold = ({ match }: RouteComponentProps<Routes>) => {
  const id = match.params.id;
  return (
    <div className="da__container">
      <div className="da__back">
        <Link to={`${baseUrl}/#arbeidsforhold`}>
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
