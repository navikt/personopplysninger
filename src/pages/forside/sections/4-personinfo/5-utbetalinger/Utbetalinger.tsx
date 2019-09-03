import React, { Component } from "react";
import Box from "../../../../../components/box/Box";
import kontonummerIkon from "../../../../../assets/img/Kontonummer.svg";
import { Personalia as PersonaliaType } from "../../../../../types/personalia";
import Kilde from "../../../../../components/kilde/Kilde";
import endreIkon from "../../../../../assets/img/Pencil.svg";
import Environment from "../../../../../utils/Environments";
import Melding from "../../../../../components/melding/Melding";
import NorskKontonummer from "./visning/NorskKontonummer";
import Utenlandskonto from "./visning/UtenlandsBankkonto";

interface Props {
  personalia: PersonaliaType;
}

const { tjenesteUrl } = Environment();

class Utbetalinger extends Component<Props> {
  render() {
    const { kontonr, utenlandskbank } = this.props.personalia;

    return (
      <Box id="utbetaling" tittel="utbetalinger.tittel" icon={kontonummerIkon}>
        <hr className="box__linje-bred" />
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
          lenke={`${tjenesteUrl}/brukerprofil/`}
          lenkeTekst="personalia.link.brukerprofil.endre"
          lenkeType={"EKSTERN"}
          ikon={endreIkon}
        />
      </Box>
    );
  }
}

export default Utbetalinger;
