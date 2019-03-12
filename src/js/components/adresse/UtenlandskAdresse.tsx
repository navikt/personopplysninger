import React from "react";
import { UtenlandskAdresse as UtenlandskAdresseType } from "../../../types/adresser/utenlandskadresse";
import ListElement from "../ListElement";
import AdressePanel from "./AdressePanel";
import { mergeAddress } from "../../utils/text";

interface Props {
  utenlandskadresse: UtenlandskAdresseType;
}

const UtenlandskAdresse = (props: Props) => {
  const { adresse1, adresse2, adresse3, land } = props.utenlandskadresse;
  const adresse = mergeAddress(adresse1, adresse2, adresse3);
  return (
    <AdressePanel tittel="adresse.utenlandskadresse">
      <ul className="list-column-2">
        {adresse && <ListElement titleId="adresse.adresse" content={adresse} />}
        {land && <ListElement titleId="adresse.land" content={land} />}
      </ul>
    </AdressePanel>
  );
};

export default UtenlandskAdresse;
