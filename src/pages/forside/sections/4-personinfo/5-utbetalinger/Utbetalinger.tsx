import React, { Component } from "react";
import Box from "../../../../../components/box/Box";
import kontonummerIkon from "../../../../../assets/img/Kontonummer.svg";
import Kontonummer from "./subsections/Kontonummer";
import { Personalia as PersonaliaType } from "../../../../../types/personalia";

interface Props {
  personalia: PersonaliaType;
}

class Utbetaling extends Component<Props> {
  render() {
    const { kontonr, utenlandskbank } = this.props.personalia;

    return (
      <Box id="utbetaling" tittel="utbetalinger.tittel" icon={kontonummerIkon}>
        <hr className="box__linje-bred" />
        <Kontonummer
          kontonummer={kontonr}
          utenlandskBankkonto={utenlandskbank}
        />
      </Box>
    );
  }
}

export default Utbetaling;
