import React, { Component } from "react";
import Box from "../../../components/box/Box";
import personalia from "../../../assets/img/personalia.svg";
import Kontonummer from "./subsections/Kontonummer";
import Folkeregisteret from "./subsections/Folkeregisteret";
import Telefonnummer from "./subsections/Telefonnummer";
import DKIF from "./subsections/DKIF";
import { Personalia as PersonaliaType } from "../../../types/personalia";

interface Props {
  personalia: PersonaliaType;
}

class Personalia extends Component<Props> {
  render() {
    const { kontonr } = this.props.personalia;

    return (
      <Box
        id="personalia"
        tittel="personalia.tittel"
        beskrivelse="personalia.beskrivelse"
        icon={personalia}
      >
        <hr className="box__linje-bred" />
        <Folkeregisteret personalia={this.props.personalia} />
        <Kontonummer kontonummer={kontonr} />
        <Telefonnummer tlfnr={this.props.personalia.tlfnr} />
        <DKIF />
      </Box>
    );
  }
}

export default Personalia;
