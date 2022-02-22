import React from "react";
import Postnummer from "../../../komponenter/Postnummer";
import { Vegadresse as VegadresseType } from "types/adresser/adresse";
import { Normaltekst } from "nav-frontend-typografi";

const Vegadresse = (props: VegadresseType) => {
  const { husnummer, husbokstav } = props;
  const { adressenavn, tilleggsnavn } = props;
  const { postnummer, poststed, coAdressenavn } = props;
  return (
    <>
      {tilleggsnavn && (
        <div className="adresse__linje">
          <Normaltekst>{tilleggsnavn}</Normaltekst>
        </div>
      )}
      {coAdressenavn && (
        <div className="adresse__linje">
          <Normaltekst>{coAdressenavn}</Normaltekst>
        </div>
      )}
      {(adressenavn || husnummer || husbokstav) && (
        <div className="adresse__linje">
          <Normaltekst>
            {adressenavn || ""} {husnummer || ""} {husbokstav || ""}
          </Normaltekst>
        </div>
      )}
      <Postnummer postnummer={postnummer} poststed={poststed} />
    </>
  );
};

export default Vegadresse;
