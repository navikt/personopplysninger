import React from "react";
import { Systemtittel } from "nav-frontend-typografi";
import { FormattedHTMLMessage } from "react-intl";
import Veilederpanel from "nav-frontend-veilederpanel";
import Modal from "nav-frontend-modal";
import Infotekst from "components/infotekst/Infotekst";
import ScrollableAnchor from "react-scrollable-anchor";

interface Props {
  id: string;
  tittel: string;
  beskrivelse?: string;
  icon?: string;
  children: JSX.Element | JSX.Element[];
}

Modal.setAppElement("#app");
const Box = (props: Props) => {
  const { tittel, beskrivelse, icon, children, id } = props;
  const Veileder = <img src={icon} className="box__ikon" alt="Veileder" />;

  return (
    <div className="box__wrapper">
      <ScrollableAnchor id={id}>
        <Veilederpanel svg={Veileder} type={"plakat"} kompakt={true}>
          <div className="box__container">
            <div className="box__header">
              <div className="box__title-container">
                <div className="box__line" />
                {tittel && (
                  <Systemtittel className="box__title">
                    <FormattedHTMLMessage id={tittel} />
                  </Systemtittel>
                )}
                {beskrivelse && <Infotekst beskrivelse={beskrivelse} />}
                <div className="box__line" />
              </div>
            </div>
            <div className="box__content">{children}</div>
          </div>
        </Veilederpanel>
      </ScrollableAnchor>
    </div>
  );
};

export default Box;
