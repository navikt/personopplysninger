import React from "react";
import { DetaljertArbeidsforhold } from "@navikt/arbeidsforhold";
import Environment from "../../utils/Environments";
import { withRouter, RouteComponentProps } from "react-router";
import { VenstreChevron } from "nav-frontend-chevron";
import { Link } from "react-router-dom";

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
        <Link to={{ pathname: "/#arbeidsforhold", state: id }}>
          <VenstreChevron />
          Tilbake
        </Link>
      </div>
      <div className="da__innhold">
        <DetaljertArbeidsforhold miljo={miljo} arbeidsforholdId={id} />
      </div>
    </div>
  );
};

export default withRouter(Arbeidsforhold);
