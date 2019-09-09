import React from "react";
import { useStore } from "../../../../../providers/Provider";
import { Adresser } from "../../../../../types/adresser";
import AdresserPDL from "./Adresser-PDL";
import AdresserOLD from "./Adresser-OLD";

interface Props {
  adresser: Adresser;
}

const Utbetalinger = (props: Props) => {
  const [{ featureToggles }] = useStore();
  return featureToggles.data["personopplysninger.pdl"] ? (
    <AdresserPDL adresser={props.adresser} />
  ) : (
    <AdresserOLD adresser={props.adresser} />
  );
};

export default Utbetalinger;
