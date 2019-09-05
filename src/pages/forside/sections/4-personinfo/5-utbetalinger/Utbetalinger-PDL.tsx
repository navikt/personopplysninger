import React, { useEffect, useState } from "react";
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
import OpprettEllerEndreUtenlandskontonr from "./endring/UtenlandsBankkonto";
import { RadioPanelGruppe } from "nav-frontend-skjema";

interface Props {
  personalia: PersonaliaType;
}

const UtbetalingerPDL = (props: Props) => {
  const [opprettEllerEndre, settOpprettEllerEndre] = useState();
  const [norskEllerUtenlandsk, settNorskEllerUtenlandsk] = useState();
  const [utenlandskbank, settUtenlandskbank] = useState();
  const [kontonr, settKontonr] = useState();

  useEffect(() => {
    settKontonr(props.personalia.kontonr);
    settUtenlandskbank(props.personalia.utenlandskbank);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const radioButtons = [
    {
      label: "Norsk kontonummer",
      value: "NORSK"
    },
    {
      label: "Utenlandsk kontonummer",
      value: "UTENLANDSK"
    }
  ];

  return (
    <Box id="utbetaling" tittel="utbetalinger.tittel" icon={kontonummerIkon}>
      <hr className="box__linje-bred" />
      {opprettEllerEndre ? (
        <>
          <div className="utbetalinger__type">
            <RadioPanelGruppe
              name="type"
              legend=""
              radios={radioButtons}
              checked={norskEllerUtenlandsk}
              onChange={(e, value) => settNorskEllerUtenlandsk(value)}
            />
          </div>
          {norskEllerUtenlandsk === "NORSK" && (
            <OpprettEllerEndreNorskKontonr
              onChangeSuccess={kontonummer => {
                settKontonr(kontonummer);
                settOpprettEllerEndre(false);
                settUtenlandskbank(undefined);
              }}
            />
          )}
          {norskEllerUtenlandsk === "UTENLANDSK" && (
            <OpprettEllerEndreUtenlandskontonr
              onChangeSuccess={bank => {
                settUtenlandskbank(bank);
                settOpprettEllerEndre(false);
                settKontonr(undefined);
              }}
            />
          )}
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
          {kontonr || utenlandskbank ? (
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
            lenkeTekst={
              kontonr || utenlandskbank ? "side.endre" : "side.leggtil"
            }
            lenkeType={"KNAPP"}
            ikon={kontonr || utenlandskbank ? endreIkon : leggTilIkon}
          />
        </>
      )}
    </Box>
  );
};

export default UtbetalingerPDL;
