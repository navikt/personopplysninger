import React from "react";
import Box from "components/box/Box";
import kontaktIkon from "assets/img/Kontakt.svg";
import TelefonnummerHosNav from "./subsections/TelefonnummerHosNav";
import DKIF from "./subsections/kontakt-og-reservasjonsregisteret/DKIF-Fetch";
import { Tlfnr } from "types/personalia";

interface Props {
  tlfnr?: Tlfnr;
}

const KontaktInfo = (props: Props) => {
  return (
    <Box id="kontaktinformasjon" tittel="kontaktinfo.tittel" icon={kontaktIkon} visAnkerlenke={true}>
      <TelefonnummerHosNav tlfnr={props.tlfnr} />
      <DKIF />
    </Box>
  );
};

export default KontaktInfo;
