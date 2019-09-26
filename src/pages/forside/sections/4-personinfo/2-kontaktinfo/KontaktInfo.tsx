import React from "react";
import Box from "../../../../../components/box/Box";
import kontaktIkon from "../../../../../assets/img/Kontakt.svg";
import TelefonnummerHosNavPDL from "./subsections/TelefonnummerHosNav-PDL";
import DKIF from "./subsections/kontakt-og-reservasjonsregisteret/DKIF-Fetch";
import { Tlfnr } from "../../../../../types/personalia";
import { useStore } from "../../../../../providers/Provider";
import TelefonnummerHosNavOLD from "./subsections/TelefonnummerHosNav-OLD";

interface Props {
  tlfnr?: Tlfnr;
}

const KontaktInfo = (props: Props) => {
  const [{ featureToggles }] = useStore();
  return (
    <Box id="kontaktinformasjon" tittel="kontaktinfo.tittel" icon={kontaktIkon}>
      {featureToggles.data["personopplysninger.pdl"] ? (
        <TelefonnummerHosNavPDL tlfnr={props.tlfnr} />
      ) : (
        <TelefonnummerHosNavOLD tlfnr={props.tlfnr} />
      )}
      <div className="underseksjon__divider" />
      <DKIF />
    </Box>
  );
};

export default KontaktInfo;
