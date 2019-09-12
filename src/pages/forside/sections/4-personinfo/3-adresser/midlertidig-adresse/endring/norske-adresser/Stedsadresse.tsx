import React from "react";
import { Tilleggsadresse } from "../../../../../../../../types/adresser/tilleggsadresse";

interface Props {
  utenlandskadresse: Tilleggsadresse;
  onChangeSuccess: (konto: Tilleggsadresse) => void;
}

export interface OutboundStedsadresse {
  adresselinje1: string;
  adresselinje2: string;
  adresselinje3: string;
  landkode: string;
  gyldigTom: string;
}

const Stedsadresse = (props: Props) => {
  return <div>Postboksadresse</div>;
};

export default Stedsadresse;
