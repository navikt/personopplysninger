import React from "react";
import { UtenlandskBankkonto } from "types/personalia";
import { useStore } from "providers/Provider";
import UtbetalingerPDL from "./Utbetalinger-PDL";
import UtbetalingerOLD from "./Utbetalinger-OLD";

interface Props {
  utenlandskbank?: UtenlandskBankkonto;
  kontonr?: string;
}
const Utbetalinger = (props: Props) => {
  const [{ featureToggles }] = useStore();
  return featureToggles.data["personopplysninger.pdl"] ? (
    <UtbetalingerPDL
      kontonr={props.kontonr}
      utenlandskbank={props.utenlandskbank}
    />
  ) : (
    <UtbetalingerOLD
      kontonr={props.kontonr}
      utenlandskbank={props.utenlandskbank}
    />
  );
};

export default Utbetalinger;
