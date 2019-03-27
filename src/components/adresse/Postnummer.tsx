import React from "react";
import { Normaltekst } from "nav-frontend-typografi";

interface Props {
  postnummer?: string;
  poststed?: string;
}

const Postnummer = ({ postnummer, poststed }: Props) => (
  <div className="adresse__linje">
    <Normaltekst>
      {postnummer && postnummer} {poststed && poststed}
    </Normaltekst>
  </div>
);

export default Postnummer;
