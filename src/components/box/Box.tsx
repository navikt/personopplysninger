import React from "react";
import { Systemtittel } from "nav-frontend-typografi";
import { FormattedMessage, injectIntl, InjectedIntlProps } from "react-intl";
import Veilederpanel from "nav-frontend-veilederpanel";
import Modal from "nav-frontend-modal";
import Infotekst from "../infotekst/Infotekst";

interface Props {
  id: string;
  tittel: string;
  beskrivelse?: string;
  icon?: string;
  children: JSX.Element | JSX.Element[];
}

Modal.setAppElement("#app");
const Box = (props: Props & InjectedIntlProps) => {
  const { tittel, beskrivelse, icon, children, id } = props;

  return (
    <div className="box__wrapper">
      <Veilederpanel
        svg={<img src={icon} className="box__ikon" alt="Veileder" />}
        type={"plakat"}
        kompakt
      >
        <div className="box__container">
          <div className="box__header" id={id}>
            <div className="box__title-container">
              {tittel && (
                <Systemtittel>
                  <FormattedMessage id={tittel} />
                </Systemtittel>
              )}
              {beskrivelse && <Infotekst beskrivelse={beskrivelse} />}
            </div>
          </div>
          <div className="box__content">{children}</div>
        </div>
      </Veilederpanel>
    </div>
  );
};

export default injectIntl(Box);
