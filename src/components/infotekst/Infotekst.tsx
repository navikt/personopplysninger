import React, { useState } from "react";
import { Normaltekst } from "nav-frontend-typografi";
import Modal from "nav-frontend-modal";
import infoIkon from "assets/img/Informasjonstekst.svg";
import infoIkonFylt from "assets/img/Informasjonstekst-fylt.svg";
import { FormattedHTMLMessage } from "react-intl";

interface HjelpetekstProps {
  beskrivelse: string;
}

function Infotekst(props: HjelpetekstProps) {
  const [hover, settHover] = useState(false);
  const [erSynlig, settErSynlig] = useState(false);

  return (
    <>
      <button
        className="infotekst__title-i-button"
        onClick={() => settErSynlig(!erSynlig)}
        onMouseEnter={() => settHover(true)}
        onMouseLeave={() => settHover(false)}
        title={"Informasjon"}
        aria-label={"Informasjonstekst"}
        aria-pressed={erSynlig}
      >
        <img
          src={hover ? infoIkonFylt : infoIkon}
          className="infotekst__title-i-icon"
          alt="Vis mer informasjon"
        />
      </button>
      <Modal
        isOpen={erSynlig}
        onRequestClose={() => settErSynlig(false)}
        closeButton={true}
        contentLabel="Min modalrute"
        className="infotekst__modal"
      >
        <div style={{ padding: "2rem 2.5rem" }}>
          <div className="infotekst__ingress">
            <Normaltekst>
              <FormattedHTMLMessage id={props.beskrivelse} />
            </Normaltekst>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Infotekst;
