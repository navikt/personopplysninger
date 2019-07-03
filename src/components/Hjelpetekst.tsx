import React, { useState } from "react";
import Ikon from "nav-frontend-ikoner-assets";
import { Normaltekst } from "nav-frontend-typografi";
import Modal from "nav-frontend-modal";

interface HjelpetekstProps {
  beskrivelse: string;
}

function Hjelpetekst(props: HjelpetekstProps) {
  const [hover, settHover] = useState(false);
  // const [focus, settFocus] = useState(false);
  // const [active, settActive] = useState(false);
  const [erSynlig, settErSynlig] = useState(false);

  return (
    <div className="hjelpetekst">
      <button
        className="box__title-i-icon"
        onClick={() => settErSynlig(!erSynlig)}
        onMouseEnter={() => settHover(true)}
        onMouseLeave={() => settHover(false)}
        // onFocus={() => settFocus(true)}
        // onBlur={() => settFocus(false)}
        // onMouseDown={() => settActive(true)}
        // onMouseUp={() => settActive(false)}
        title={"Hjelpetekst"}
        aria-label={"Hjelpetekst"}
        aria-pressed={erSynlig}
        // aria-describedby={erSynlig ? ariaId : undefined}
      >
        <span className="sr-only"></span> // Må ha noe her for skjermlesere
        <Ikon
          kind={hover ? "info-sirkel-fyll" : "ok-sirkel-fyll"}
          className="hjelpetekst_anchor"
        />
      </button>
      <Modal
        isOpen={erSynlig}
        onRequestClose={() => settErSynlig(false)}
        closeButton={true}
        contentLabel="Min modalrute"
        className="box__modal"
      >
        <div style={{ padding: "2rem 2.5rem" }}>
          <div className="box__ingress">
            {console.log(props.beskrivelse)}
            <Normaltekst>{props.beskrivelse}</Normaltekst>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Hjelpetekst;
