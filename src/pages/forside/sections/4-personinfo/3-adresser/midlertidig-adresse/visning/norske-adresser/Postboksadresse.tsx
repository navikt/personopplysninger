import React from "react";
import Postnummer from "../../../komponenter/Postnummer";
import { Postboksadresse as PostboksadresseType } from "types/adresser/adresse";
import { Normaltekst } from "nav-frontend-typografi";

const Postboksadresse = (props: PostboksadresseType) => {
  const { postbokseier, postboks, postnummer, coAdressenavn } = props;
  const { poststed } = props;
  return (
    <>
      {coAdressenavn && (
        <div className="adresse__linje">
          <Normaltekst>{coAdressenavn}</Normaltekst>
        </div>
      )}
      {postbokseier && (
        <div className="adresse__linje">
          <Normaltekst>{postbokseier}</Normaltekst>
        </div>
      )}
      {postboks && (
        <div className="adresse__linje">
          <Normaltekst>{postboks}</Normaltekst>
        </div>
      )}
      <Postnummer postnummer={postnummer} poststed={poststed} />
    </>
  );
};

export default Postboksadresse;
