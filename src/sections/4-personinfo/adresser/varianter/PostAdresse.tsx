import React from "react";
import { Normaltekst } from "nav-frontend-typografi";
import AdressePanel from "../../../../components/adresse/AdressePanel";
import GateAdresse from "../../../../components/adresse/GateAdresse";
import Postnummer from "../../../../components/adresse/Postnummer";
import { Postadresse } from "../../../../types/adresser/postadresse";
import Kilde from "../../../../components/kilde/Kilde";

interface Props {
  postadresse: Postadresse;
}

const PostAdresse = (props: Props) => {
  const {
    adresse1,
    adresse2,
    adresse3,
    postnummer,
    poststed,
    land
  } = props.postadresse;
  return (
    <AdressePanel tittel="adresse.postadresse">
      <>
        <GateAdresse
          adresse1={adresse1}
          adresse2={adresse2}
          adresse3={adresse3}
        />
        <Postnummer postnummer={postnummer} poststed={poststed} />
        {land && (
          <div className="adresse__linje">
            <Normaltekst>{land}</Normaltekst>
          </div>
        )}
        <Kilde
          tekst="personalia.source.folkeregisteret"
          lenkeTekst="personalia.link.folkeregisteret"
          href="https://www.skatteetaten.no/person/folkeregister/"
        />
      </>
    </AdressePanel>
  );
};

export default PostAdresse;
