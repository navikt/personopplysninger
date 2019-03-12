import React from "react";
import ListElement from "../ListElement";
import AdressePanel from "./AdressePanel";
import { Postadresse } from "../../../types/adresser/postadresse";
import { mergeAddress } from "../../utils/text";

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
  const adresse = mergeAddress(adresse1, adresse2, adresse3);
  return (
    <AdressePanel tittel="adresse.postadresse">
      <ul className="list-column-2">
        {adresse && <ListElement titleId="adresse.adresse" content={adresse} />}
        {postnummer && (
          <ListElement titleId="adresse.postnummer" content={postnummer} />
        )}
        {land && <ListElement titleId="adresse.land" content={land} />}
        {poststed && (
          <ListElement titleId="adresse.poststed" content={poststed} />
        )}
      </ul>
    </AdressePanel>
  );
};

export default PostAdresse;
