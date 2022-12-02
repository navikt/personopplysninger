import React, { Fragment } from "react";
import { FormattedMessage } from "react-intl";
import { useStore } from "store/Context";
import { BodyLong, Link } from "@navikt/ds-react";

interface Props {
  melding: string;
}
const Alternativ = (props: Props) => {
  const { melding } = props;
  const [{ locale }] = useStore();
  return (
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
  );
};

export default Alternativ;