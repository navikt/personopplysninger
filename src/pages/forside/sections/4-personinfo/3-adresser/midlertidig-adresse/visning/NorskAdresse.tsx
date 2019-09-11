import React from "react";
import GateAdresse from "../../komponenter/GateAdresse";
import Postnummer from "../../komponenter/Postnummer";
import { Tilleggsadresse } from "../../../../../../../types/adresser/tilleggsadresse";

interface Props {
  tilleggsadresse: Tilleggsadresse;
}

const NorskMidlertidigAdresse = (props: Props) => {
  const {
    adresse1,
    adresse2,
    adresse3,
    postnummer,
    poststed
  } = props.tilleggsadresse;
  return (
    <>
      <GateAdresse
        adresse1={adresse1}
        adresse2={adresse2}
        adresse3={adresse3}
      />
      <Postnummer postnummer={postnummer} poststed={poststed} />
    </>
  );
};

export default NorskMidlertidigAdresse;
