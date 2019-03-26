import React, { Component } from "react";
import Box from "../../../components/box/Box";
import kvinne from "../../../assets/img/kvinne.svg";
import mann from "../../../assets/img/mann.png";
import Kontonummer from "./subsections/Kontonummer";
import Folkeregisteret from "./subsections/Folkeregisteret";
import DKIF from "./subsections/DKIF";
import { Personalia as PersonaliaType } from "../../../types/personalia";

interface Props {
  personalia: PersonaliaType;
}

class Personalia extends Component<Props> {
  render() {
    const { kontonr, kjoenn } = this.props.personalia;

    return (
      <Box
        id="personalia"
        header="Personalia"
        icon={kjoenn === "Mann" ? mann : kvinne}
        infoType="personalia"
      >
        <Folkeregisteret personalia={this.props.personalia} />
        <Kontonummer kontonummer={kontonr} />
        <DKIF />
      </Box>
    );
  }
}

export default Personalia;
