import React from "react";
import { redirects } from "utils/redirects";
import veilederIkon from "assets/img/VeilederGul.svg";
import naturIkon from "assets/img/Natur.svg";
import { VenstreChevron } from "nav-frontend-chevron";

interface Props {
  tjeneste: string;
  redirectUrl: string;
}

const RedirectKnapp = (props: Props) => {
  const redirect = redirects[props.tjeneste];
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
          <div dangerouslySetInnerHTML={{ __html: redirect.beskrivelse }} />
          <div className="redirect__lenke">
            <div className="redirect__chevron">
              <VenstreChevron />
            </div>
            <a href={decodeURIComponent(props.redirectUrl)}>{redirect.knapp}</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RedirectKnapp;
