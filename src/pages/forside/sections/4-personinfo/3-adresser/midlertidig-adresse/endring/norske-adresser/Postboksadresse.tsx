import React from "react";
import { Tilleggsadresse } from "../../../../../../../../types/adresser/tilleggsadresse";

interface Props {
  utenlandskadresse: Tilleggsadresse;
  onChangeSuccess: (konto: Tilleggsadresse) => void;
}

export interface OutboundPostboksadresse {
  adresselinje1: string;
  adresselinje2: string;
  adresselinje3: string;
  landkode: string;
  gyldigTom: string;
}

const Postboksadresse = (props: Props) => {
  return <div>Postboksadresse</div>;
};

export default Postboksadresse;
