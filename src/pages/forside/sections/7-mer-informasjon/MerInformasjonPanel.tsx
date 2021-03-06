import React, { Fragment, useState } from "react";
import { Normaltekst } from "nav-frontend-typografi";
import { FormattedMessage } from "react-intl";
import Lenke from "nav-frontend-lenker";
import { useStore } from "store/Context";

interface Props {
  tittel: string;
  melding: string;
}
const Alternativ = (props: Props) => {
  const { tittel, melding } = props;
  const [{ locale }] = useStore();
  const [visBeskrivelse, settVisBeskrivelse] = useState(false);
  return (
    <>
      <button
        className="mi__button"
        onClick={() => settVisBeskrivelse(!visBeskrivelse)}
        aria-expanded={visBeskrivelse}
      >
        <Normaltekst className="lenke mi__lenke">
          <FormattedMessage id={tittel} />
        </Normaltekst>
      </button>
      {visBeskrivelse && (
        <Normaltekst>
          <FormattedMessage
            id={melding}
            values={{
              p: (...chunks: string[]) => (
                <p>
                  {chunks.map((chunk, i) => (
                    <Fragment key={i}>{chunk}</Fragment>
                  ))}
                </p>
              ),
              beskjedLenke: (text: string) => (
                <Lenke
                  href={`/person/kontakt-oss/${locale}/skriv-til-oss`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {text}
                </Lenke>
              ),
              telefonLenke: (text: string) => (
                <Lenke href="tel:004755553333">{text}</Lenke>
              ),
              trygdeavtalerLenke: (text: string) => (
                <Lenke
                  href="https://lovdata.no/nav/andre-rettskilder/Trygdeavtaler"
                  rel="noopener noreferrer"
                  target="blank"
                >
                  {text}
                </Lenke>
              ),
              datatilsynetLenke: (text: string) => (
                <Lenke
                  href="https://www.datatilsynet.no/om-datatilsynet/kontakt-oss/hvordan-kan-jeg-klage-til-datatilsynet"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {text}
                </Lenke>
              ),
            }}
          />
        </Normaltekst>
      )}
    </>
  );
};

export default Alternativ;
