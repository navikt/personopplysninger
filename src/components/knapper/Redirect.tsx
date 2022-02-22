import React from "react";
import { redirects, validateAndDecodeRedirectUrl } from "utils/redirects";
import veilederIkon from "assets/img/VeilederGul.svg";
import naturIkon from "assets/img/Natur.svg";
import { VenstreChevron } from "nav-frontend-chevron";
import { useHistory, useLocation } from "react-router-dom";

interface Props {
  tjeneste?: string;
  encodedUrl?: string;
}

const RedirectKnapp = ({ encodedUrl, tjeneste }: Props) => {
  const history = useHistory();
  const location = useLocation();

  if (!tjeneste || !encodedUrl) {
    return null;
  }

  const redirectUrl = validateAndDecodeRedirectUrl(encodedUrl);
  if (!redirectUrl) {
    const basePath = location.pathname.split("sendt-fra")[0];
    history.replace(basePath);
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
            <a href={redirectUrl}>{redirect.knapp}</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RedirectKnapp;
