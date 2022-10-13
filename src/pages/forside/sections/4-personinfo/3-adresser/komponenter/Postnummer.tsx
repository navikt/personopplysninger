import React from "react";
import { BodyShort } from "@navikt/ds-react";

interface Props {
  postnummer?: string;
  poststed?: string;
}

const Postnummer = ({ postnummer, poststed }: Props) => (
  <div className="adresse__linje">
    <BodyShort>
      {postnummer && postnummer} {poststed && poststed}
    </BodyShort>
  </div>
);

export default Postnummer;
