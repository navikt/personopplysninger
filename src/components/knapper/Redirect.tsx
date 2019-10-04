import React from "react";
import redirectsJson from "utils/redirects.json";
import veilederIkon from "assets/img/VeilederGul.svg";
import naturIkon from "assets/img/Natur.svg";
import { VenstreChevron } from "nav-frontend-chevron";

const redirects: {
  [key: string]: {
    beskrivelse: string;
    knapp: string;
    url: string;
  };
} = redirectsJson;

interface Props {
  tjeneste: string;
}

const RedirectKnapp = (props: Props) => {
  const redirect = redirects[props.tjeneste] as any;
  return (
    <div className="redirect__container">
      <div
        className="redirect__wrapper"
        style={{ backgroundImage: `url(${naturIkon})` }}
      >
        <span className="redirect__ikon-container">
          <img src={veilederIkon} className="redirect__ikon" alt="Veileder" />
        </span>
        <div className="redirect__content">
          <div>{redirect.beskrivelse}</div>
          <div className="redirect__lenke">
            <div className="redirect__chevron">
              <VenstreChevron />
            </div>
            <a href={redirect.url}>{redirect.knapp}</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RedirectKnapp;
