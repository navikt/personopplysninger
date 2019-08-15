import React, { Component } from "react";
import Box from "../../../../../components/box/Box";
import kontaktIkon from "../../../../../assets/img/Kontakt.svg";
import Telefonnummer from "./subsections/Telefonnummer";
import DKIF from "./subsections/DKIF";
import { Personalia as PersonaliaType } from "../../../../../types/personalia";

interface Props {
  personalia: PersonaliaType;
}

class KontaktInfo extends Component<Props> {
  render() {
    return (
      <Box id="kontaktinfo" tittel="kontaktinfo.tittel" icon={kontaktIkon}>
        <hr className="box__linje-bred" />
        <Telefonnummer tlfnr={this.props.personalia.tlfnr} />
        <DKIF />
      </Box>
    );
  }
}

export default KontaktInfo;
