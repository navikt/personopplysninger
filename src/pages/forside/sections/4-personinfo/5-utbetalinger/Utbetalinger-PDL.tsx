import React, { useState } from "react";
import Box from "../../../../../components/box/Box";
import kontonummerIkon from "../../../../../assets/img/Kontonummer.svg";
import { Personalia as PersonaliaType } from "../../../../../types/personalia";
import Kilde from "../../../../../components/kilde/Kilde";
import avbrytIkon from "../../../../../assets/img/Back.svg";
import endreIkon from "../../../../../assets/img/Pencil.svg";
import leggTilIkon from "../../../../../assets/img/Pencil.svg";
import Melding from "../../../../../components/melding/Melding";
import NorskKontonummer from "./visning/NorskKontonummer";
import Utenlandskonto from "./visning/UtenlandsBankkonto";
import OpprettEllerEndreNorskKontonr from "./endring/NorskKontonummer";

interface Props {
  personalia: PersonaliaType;
}

const UtbetalingerPDL = (props: Props) => {
  const { kontonr, utenlandskbank } = props.personalia;
  const [opprettEllerEndre, settOpprettEllerEndre] = useState();
  const harRegistrertKonto = kontonr || utenlandskbank;

  return (
    <Box id="utbetaling" tittel="utbetalinger.tittel" icon={kontonummerIkon}>
      <hr className="box__linje-bred" />
      {opprettEllerEndre ? (
        <>
          <OpprettEllerEndreNorskKontonr />
          <Kilde
            kilde="personalia.source.nav"
            onClick={() => settOpprettEllerEndre(false)}
            lenkeTekst="side.avbryt"
            lenkeType={"KNAPP"}
            ikon={avbrytIkon}
          />
        </>
      ) : (
        <>
          {harRegistrertKonto ? (
            <>
              <NorskKontonummer kontonummer={kontonr} />
              <Utenlandskonto utenlandskBankkonto={utenlandskbank} />
            </>
          ) : (
            <Melding meldingId="personalia.kontonr.ingenData" />
          )}
          <Kilde
            kilde="personalia.source.nav"
            onClick={() => settOpprettEllerEndre(true)}
            lenkeTekst={!harRegistrertKonto ? "side.leggtil" : "side.endre"}
            lenkeType={"KNAPP"}
            ikon={!harRegistrertKonto ? leggTilIkon : endreIkon}
          />
        </>
      )}
    </Box>
  );
};

export default UtbetalingerPDL;
