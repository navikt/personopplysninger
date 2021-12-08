import React from "react";
import { Ukjentbosted as UkjentbostedType } from "types/adresser/adresse";
import { Normaltekst } from "nav-frontend-typografi";

const Ukjentbosted = (props: UkjentbostedType) => {
  const { bostedskommune, coAdressenavn } = props;
  return (
    <>
      {coAdressenavn && (
        <div className="adresse__linje">
          <Normaltekst>{coAdressenavn}</Normaltekst>
        </div>
      )}
      {bostedskommune && (
        <div className="adresse__linje">
          <Normaltekst>{bostedskommune}</Normaltekst>
        </div>
      )}
      <div className="adresse__divider" />
    </>
  );
};

export default Ukjentbosted;
