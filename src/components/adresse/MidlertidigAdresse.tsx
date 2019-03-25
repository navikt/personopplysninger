import React from "react";
import ListElement from "../listelement/ListElement";
import AdressePanel from "./AdressePanel";
import GateAdresse from "./GateAdresse";
import { Tilleggsadresse } from "../../types/adresser/tilleggsadresse";
import { mergeAddress } from "../../utils/text";

interface Props {
  tilleggsadresse: Tilleggsadresse;
}

const MidlertidigAdresse = (props: Props) => {
  const {
    adresse1,
    adresse2,
    adresse3,
    postnummer,
    poststed
  } = props.tilleggsadresse;
  return (
    <AdressePanel tittel="adresse.midlertidigadresse">
      <ul className="list-column-2">
        <GateAdresse
          adresse1={adresse1}
          adresse2={adresse2}
          adresse3={adresse3}
        />
        {postnummer && (
          <ListElement titleId="adresse.postnummer" content={postnummer} />
        )}
        {poststed && (
          <ListElement titleId="adresse.poststed" content={poststed} />
        )}
      </ul>
    </AdressePanel>
  );
};

export default MidlertidigAdresse;
