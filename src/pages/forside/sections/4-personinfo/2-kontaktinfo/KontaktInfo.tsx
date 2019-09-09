import React from "react";
import Box from "../../../../../components/box/Box";
import kontaktIkon from "../../../../../assets/img/Kontakt.svg";
import TelefonnummerHosNavPDL from "./subsections/TelefonnummerHosNav-PDL";
import DKIF from "./subsections/kontakt-og-reservasjonsregisteret/DKIF-Fetch";
import { Tlfnr } from "../../../../../types/personalia";
import { useStore } from "../../../../../providers/Provider";
import TelefonnummerHosNav from "./subsections/TelefonnummerHosNav";

interface Props {
  tlfnr?: Tlfnr;
}

const KontaktInfo = (props: Props) => {
  const [{ featureToggles }] = useStore();
  return (
    <Box id="kontaktinformasjon" tittel="kontaktinfo.tittel" icon={kontaktIkon}>
      <hr className="box__linje-bred" />
      {featureToggles.data["personopplysninger.pdl"] ? (
        <TelefonnummerHosNavPDL tlfnr={props.tlfnr} />
      ) : (
        <TelefonnummerHosNav tlfnr={props.tlfnr} />
      )}
      <DKIF />
    </Box>
  );
};

export default KontaktInfo;
