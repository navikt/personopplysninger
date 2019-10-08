import React from "react";
import { Systemtittel } from "nav-frontend-typografi";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { FormattedHTMLMessage } from "react-intl";
import Veilederpanel from "nav-frontend-veilederpanel";
import Modal from "nav-frontend-modal";
import Infotekst from "../infotekst/Infotekst";
import ScrollableAnchor from "react-scrollable-anchor";
import ContentLoader from "react-content-loader";

interface Props {
  id: string;
  tittel?: string;
  loading?: boolean;
  beskrivelse?: string;
  icon?: string;
  children: JSX.Element | JSX.Element[];
}

Modal.setAppElement("#app");
const Box = (props: Props & InjectedIntlProps) => {
  const { tittel, beskrivelse, icon, children, id, loading } = props;
  const imgIcon = icon ? (
    <img src={icon} className="box__ikon" alt="Veileder" />
  ) : null;

  const LoaderContent = () => (
    <ContentLoader>
      <rect x="0" y="5" rx="4" ry="4" width="35%" height="10" />
      <rect x="0" y="20" rx="3" ry="3" width="45%" height="10" />

      <rect x="50%" y="5" rx="4" ry="4" width="35%" height="10" />
      <rect x="50%" y="20" rx="3" ry="3" width="45%" height="10" />

      <rect x="0" y="50" rx="4" ry="4" width="35%" height="10" />
      <rect x="0" y="65" rx="3" ry="3" width="45%" height="10" />

      <rect x="0" y="95" rx="4" ry="4" width="35%" height="10" />
      <rect x="0" y="110" rx="3" ry="3" width="45%" height="10" />
    </ContentLoader>
  );

  const LoaderTittel = () => (
    <ContentLoader>
      <rect x="0" y="25" rx="20" ry="20" width="100%" height="50" />
    </ContentLoader>
  );

  const LoaderLogo = () => (
    <ContentLoader width={100} height={100}>
      <circle cx="50" cy="50" r="40" />
    </ContentLoader>
  );
  return (
    <div className="box__wrapper">
      <ScrollableAnchor id={id}>
        <Veilederpanel
          svg={loading ? <LoaderLogo /> : imgIcon}
          type={"plakat"}
          kompakt={true}
        >
          <div className="box__container">
            <div className="box__header">
              <div className="box__title-container">
                <div className="box__line" />
                {loading && (
                  <div style={{ width: "25rem", height: "28px" }}>
                    <LoaderTittel />
                  </div>
                )}
                {tittel && (
                  <Systemtittel className="box__title">
                    <FormattedHTMLMessage id={tittel} />
                  </Systemtittel>
                )}
                {beskrivelse && <Infotekst beskrivelse={beskrivelse} />}
                <div className="box__line" />
              </div>
            </div>
            <div className="box__content">
              {loading ? <LoaderContent /> : children}
            </div>
          </div>
        </Veilederpanel>
      </ScrollableAnchor>
    </div>
  );
};

export default injectIntl(Box);
