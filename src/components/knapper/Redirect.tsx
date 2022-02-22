import React from "react";
import { redirects, validateAndDecodeRedirectUrl } from "utils/redirects";
import veilederIkon from "assets/img/VeilederGul.svg";
import naturIkon from "assets/img/Natur.svg";
import { VenstreChevron } from "nav-frontend-chevron";

interface Props {
  tjeneste?: string;
  encodedUrl?: string;
}

const RedirectKnapp = ({ encodedUrl, tjeneste }: Props) => {
  const redirectUrl = validateAndDecodeRedirectUrl(encodedUrl);

  if (!redirectUrl || !tjeneste) {
    return null;
  }

  const redirect = redirects[tjeneste];

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
            <a href={encodedUrl}>{redirect.knapp}</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RedirectKnapp;
