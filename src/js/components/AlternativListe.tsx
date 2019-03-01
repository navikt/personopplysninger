import React from "react";
import { Innholdstittel } from "nav-frontend-typografi";
import { FormattedMessage } from "react-intl";
import Alternativ from "./Alternativ";
import alternatives from "../static/alternatives";

const AlternativListe = () => (
  <React.Fragment>
    <div className="BoxContainer">
      <div className="AlternativesBox box-bottom-margin">
        <Innholdstittel>
          <FormattedMessage id="alternativer.tittel" />
        </Innholdstittel>
        <div className="icon-box-margin">
          {alternatives.map(alternative => (
            <Alternativ
              key={alternative.id}
              description={alternative.description}
              content={alternative.content}
            />
          ))}
        </div>
      </div>
    </div>
  </React.Fragment>
);

export default AlternativListe;
