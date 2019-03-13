import React from "react";
import ListElement from "../ListElement";
import AdressePanel from "./AdressePanel";
import GateAdresse from "./GateAdresse";
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
  return (
    <AdressePanel tittel="adresse.postadresse">
      <ul className="list-column-2">
        <GateAdresse
          adresse1={adresse1}
          adresse2={adresse2}
          adresse3={adresse3}
        />
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
