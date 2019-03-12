import React from "react";
import ListElement from "../ListElement";
import AdressePanel from "./AdressePanel";
import { Tilleggsadresse } from "../../../types/adresser/tilleggsadresse";
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
  const adresse = mergeAddress(adresse1, adresse2, adresse3);
  return (
    <AdressePanel tittel="adresse.midlertidigadresse">
      <ul className="list-column-2">
        {adresse && <ListElement titleId="adresse.adresse" content={adresse} />}
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
