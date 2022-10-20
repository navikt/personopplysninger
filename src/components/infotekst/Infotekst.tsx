import React, { Fragment, useState } from "react";
import infoIkon from "assets/img/Informasjonstekst.svg";
import infoIkonFylt from "assets/img/Informasjonstekst-fylt.svg";
import { FormattedMessage } from "react-intl";
import { Link, BodyLong, Modal } from "@navikt/ds-react";

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
        open={erSynlig}
        onClose={() => settErSynlig(false)}
        closeButton={true}
        className="infotekst__modal"
      >
        <Modal.Content>
          <div style={{ padding: "2rem 2.5rem" }}>
            <div className="infotekst__ingress">
              <BodyLong>
                <FormattedMessage
                  id={props.beskrivelse}
                  values={{
                    p: (...chunks: string[]) => (
                      <p>
                        {chunks.map((chunk, i) => (
                          <Fragment key={i}>{chunk}</Fragment>
                        ))}
                      </p>
                    ),
                    br: (text: string) => (
                      <>
                        <br />
                        {text}
                      </>
                    ),
                    b: (text: string) => <b>{text}</b>,
                    span: (text: string) => (
                      <span style={{ textTransform: "none" }}>{text}</span>
                    ),
                    lenkeAaRegisteret: (text: string) => (
                      <Link href="/no/Bedrift/Tjenester+og+skjemaer/Aa-registeret+og+a-meldingen">
                        {text}
                      </Link>
                    ),
                  }}
                />
              </BodyLong>
            </div>
          </div>
        </Modal.Content>
      </Modal>
    </>
  );
}

export default Infotekst;
