import React, { useState } from "react";
import { Ingress, Systemtittel } from "nav-frontend-typografi";
import { FormattedMessage, injectIntl, InjectedIntlProps } from "react-intl";
import Veilederpanel from "nav-frontend-veilederpanel";
import hjelpetekstIkon from "../../assets/img/Hjelpetekst.svg";
import Modal from "nav-frontend-modal";

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
  const [visBeskrivelse, settVisBeskrivelse] = useState(false);

  return (
    <div className="box__container">
      <Veilederpanel
        svg={<img src={icon} className="box__ikon" alt="Veileder" />}
        type={"plakat"}
        kompakt
      >
        <div className="box__header" id={id}>
          <div className="box__title-container">
            {beskrivelse && <div className="box__title-filler" />}
            {tittel && (
              <Systemtittel>
                <FormattedMessage id={tittel} />
              </Systemtittel>
            )}
            {beskrivelse && (
              <img
                src={hjelpetekstIkon}
                className="box__title-i-icon"
                alt="Vis mer informasjon"
                onClick={() => settVisBeskrivelse(true)}
              />
            )}
          </div>
        </div>
        <div className="box__content">{children}</div>
        {beskrivelse && (
          <Modal
            isOpen={visBeskrivelse}
            onRequestClose={() => settVisBeskrivelse(false)}
            closeButton={true}
            contentLabel="Min modalrute"
            className="box__modal"
          >
            <div style={{ padding: "2rem 2.5rem" }}>
              <div className="box__ingress">
                <Ingress>
                  <FormattedMessage id={beskrivelse} />
                </Ingress>
              </div>
            </div>
          </Modal>
        )}
      </Veilederpanel>
    </div>
  );
};

export default injectIntl(Box);
