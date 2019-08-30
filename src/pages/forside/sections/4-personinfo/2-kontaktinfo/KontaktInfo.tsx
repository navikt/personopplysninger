import React from "react";
import Box from "../../../../../components/box/Box";
import kontaktIkon from "../../../../../assets/img/Kontakt.svg";
import TelefonnummerHosNavPDL from "./subsections/TelefonnummerHosNav-PDL";
import DKIF from "./subsections/kontakt-og-reservasjonsregisteret/DKIF-Fetch";
import { Personalia as PersonaliaType } from "../../../../../types/personalia";
import { useStore } from "../../../../../providers/Provider";
import TelefonnummerHosNav from "./subsections/TelefonnummerHosNav";

interface Props {
  personalia: PersonaliaType;
}

const KontaktInfo = (props: Props) => {
  const [{ featureToggles }] = useStore();
  const { tlfnr } = props.personalia;
  return (
    <Box id="kontaktinformasjon" tittel="kontaktinfo.tittel" icon={kontaktIkon}>
      <hr className="box__linje-bred" />
      {featureToggles.data["personopplysninger.pdl"] ? (
        <TelefonnummerHosNavPDL tlfnr={tlfnr} />
      ) : (
        <TelefonnummerHosNav tlfnr={tlfnr} />
      )}
      <DKIF />
    </Box>
  );
};

export default KontaktInfo;
