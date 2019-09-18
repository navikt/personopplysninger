import React, { useState } from "react";
import Box from "../../../../../components/box/Box";
import kontonummerIkon from "../../../../../assets/img/Kontonummer.svg";
import { UtenlandskBankkonto } from "../../../../../types/personalia";
import Kilde from "../../../../../components/kilde/Kilde";
import avbrytIkon from "../../../../../assets/img/Back.svg";
import endreIkon from "../../../../../assets/img/Pencil.svg";
import leggTilIkon from "../../../../../assets/img/Pencil.svg";
import Melding from "../../../../../components/melding/Melding";
import NorskKontonummer from "./visning/NorskKontonummer";
import Utenlandskonto from "./visning/UtenlandsBankkonto";
import OpprettEllerEndreNorskKontonr from "./endring/NorskKontonummer";
import OpprettEllerEndreUtenlandsbank from "./endring/UtenlandsBankkonto";
import { RadioPanelGruppe } from "nav-frontend-skjema";
import { InjectedIntlProps, injectIntl } from "react-intl";

interface Props {
  utenlandskbank?: UtenlandskBankkonto;
  kontonr?: string;
}

const UtbetalingerPDL = (props: Props & InjectedIntlProps) => {
  const { kontonr, utenlandskbank } = props;
  const [opprettEllerEndre, settOpprettEllerEndre] = useState();
  const [norskEllerUtenlandsk, settNorskEllerUtenlandsk] = useState(
    kontonr ? "NORSK" : utenlandskbank ? "UTENLANDSK" : undefined
  );

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
              kontonummer={kontonr}
              onChangeSuccess={() => settOpprettEllerEndre(false)}
            />
          )}
          {norskEllerUtenlandsk === "UTENLANDSK" && (
            <OpprettEllerEndreUtenlandsbank
              utenlandskbank={utenlandskbank}
              onChangeSuccess={() => settOpprettEllerEndre(false)}
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

export default injectIntl(UtbetalingerPDL);
