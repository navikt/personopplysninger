import React from "react";
import { UtenlandskAdresse as UtenlandskAdresseType } from "../../types/adresser/utenlandskadresse";
import ListElement from "../listelement/ListElement";
import AdressePanel from "./AdressePanel";
import GateAdresse from "./GateAdresse";
import { mergeAddress } from "../../utils/text";

interface Props {
  utenlandskadresse: UtenlandskAdresseType;
}

const UtenlandskAdresse = (props: Props) => {
  const { adresse1, adresse2, adresse3, land } = props.utenlandskadresse;
  return (
    <AdressePanel tittel="adresse.utenlandskadresse">
      <ul className="list-column-2">
        <GateAdresse
          adresse1={adresse1}
          adresse2={adresse2}
          adresse3={adresse3}
        />
        {land && <ListElement titleId="adresse.land" content={land} />}
      </ul>
    </AdressePanel>
  );
};

export default UtenlandskAdresse;
