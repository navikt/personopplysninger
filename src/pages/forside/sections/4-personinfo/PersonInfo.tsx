import React from "react";
import Personalia from "./1-personalia/Personalia";
import Adresser from "./3-adresser/Adresser";
import DittNavKontor from "./5-ditt-nav-kontor/DittNavKontor";
import KontaktInfo from "./2-kontaktinfo/KontaktInfo";
import Utbetalinger from "./4-utbetalinger/Utbetalinger";
import MedPersonInfo from "../../../../providers/personinfo/PersinInfo";

const VisPersonInfo = () => (
  <MedPersonInfo>
    {({ personalia, adresser, enhetKontaktInformasjon }) => (
      <>
        {personalia && <Personalia personalia={personalia} />}
        {personalia && <KontaktInfo tlfnr={personalia.tlfnr} />}
        {adresser && <Adresser adresser={adresser} />}
        {personalia && (
          <Utbetalinger
            kontonr={personalia.kontonr}
            utenlandskbank={personalia.utenlandskbank}
          />
        )}
        {adresser && enhetKontaktInformasjon && (
          <DittNavKontor
            enhetKontaktInformasjon={enhetKontaktInformasjon}
            geografiskTilknytning={adresser.geografiskTilknytning}
          />
        )}
      </>
    )}
  </MedPersonInfo>
);

export default VisPersonInfo;
