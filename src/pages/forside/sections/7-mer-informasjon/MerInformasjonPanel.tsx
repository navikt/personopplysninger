import React, { Fragment, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useStore } from "store/Context";
import { BodyLong, BodyShort, Link } from "@navikt/ds-react";

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
        <BodyShort className="lenke mi__lenke">
          <FormattedMessage id={tittel} />
        </BodyShort>
      </button>
      {visBeskrivelse && (
        <BodyLong>
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
                <Link
                  href={`/person/kontakt-oss/${
                    locale === "en" ? "en/write-to-us" : "nb/skriv-til-oss"
                  }`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {text}
                </Link>
              ),
              telefonLenke: (text: string) => (
                <Link href="tel:004755553333">{text}</Link>
              ),
              trygdeavtalerLenke: (text: string) => (
                <Link
                  href="https://lovdata.no/nav/andre-rettskilder/Trygdeavtaler"
                  rel="noopener noreferrer"
                  target="blank"
                >
                  {text}
                </Link>
              ),
              datatilsynetLenke: (text: string) => (
                <Link
                  href="https://www.datatilsynet.no/om-datatilsynet/kontakt-oss/hvordan-kan-jeg-klage-til-datatilsynet"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {text}
                </Link>
              ),
            }}
          />
        </BodyLong>
      )}
    </>
  );
};

export default Alternativ;
