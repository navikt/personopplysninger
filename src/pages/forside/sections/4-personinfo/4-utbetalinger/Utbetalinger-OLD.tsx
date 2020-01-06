import React, { Component } from "react";
import Box from "components/box/Box";
import kontonummerIkon from "assets/img/Kontonummer.svg";
import { UtenlandskBankkonto } from "types/personalia";
import Kilde from "components/kilde/Kilde";
import endreIkon from "assets/img/Pencil.svg";
import Melding from "components/melding/Melding";
import NorskKontonummer from "./visning/NorskKontonummer";
import Utenlandskonto from "./visning/UtenlandsBankkonto";

const { REACT_APP_TJENESTER_URL } = process.env;

interface Props {
  utenlandskbank?: UtenlandskBankkonto;
  kontonr?: string;
}

class UtbetalingerOLD extends Component<Props> {
  render() {
    const { kontonr, utenlandskbank } = this.props;

    return (
      <Box id="utbetaling" tittel="utbetalinger.tittel" icon={kontonummerIkon}>
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
          lenke={`${REACT_APP_TJENESTER_URL}/brukerprofil/`}
          lenkeTekst="personalia.link.brukerprofil.endre"
          lenkeType={"EKSTERN"}
          ikon={endreIkon}
        />
      </Box>
    );
  }
}

export default UtbetalingerOLD;
