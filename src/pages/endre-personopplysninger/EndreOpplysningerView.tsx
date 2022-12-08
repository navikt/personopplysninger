import React from "react";
import AdresserVisning from "pages/forside/sections/4-personinfo/3-adresser/Adresser";
import Utbetalinger from "pages/forside/sections/4-personinfo/4-utbetalinger/Utbetalinger";
import Box from "components/box/Box";
import kontaktIkon from "assets/img/Kontakt.svg";
import TelefonnummerHosNav from "pages/forside/sections/4-personinfo/2-kontaktinfo/subsections/telefonnummer/TelefonnummerHosNav";
import { Personalia } from "../../types/personalia";
import { Adresser } from "../../types/adresser";

interface Props {
  personalia?: Personalia;
  adresser?: Adresser;
}

const EndreOpplysningerView = (props: Props) => {
  const { personalia, adresser } = props;
  return (
    <>
      {personalia && (
        <Box
          id="kontaktinformasjon"
          tittel="kontaktinfo.tittel"
          icon={kontaktIkon}
        >
          <TelefonnummerHosNav tlfnr={personalia.tlfnr} />
        </Box>
      )}
      {adresser && <AdresserVisning adresser={adresser} />}
      {personalia && (
        <Utbetalinger
          kontonr={personalia.kontonr}
          utenlandskbank={personalia.utenlandskbank}
          kontoregisterError={personalia.kontoregisterError}
        />
      )}
    </>
  );
};

export default EndreOpplysningerView;
