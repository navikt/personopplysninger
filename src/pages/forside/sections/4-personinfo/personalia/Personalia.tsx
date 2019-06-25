import React, { Component } from "react";
import Box from "../../../../../components/box/Box";
import personaliaIkon from "../../../../../assets/img/Personalia.svg";
import Folkeregisteret from "./subsections/Folkeregisteret";
import { Personalia as PersonaliaType } from "../../../../../types/personalia";

interface Props {
  personalia: PersonaliaType;
}

class Personalia extends Component<Props> {
  render() {
    return (
      <Box
        id="personalia"
        tittel="personalia.tittel"
        beskrivelse="personalia.beskrivelse"
        icon={personaliaIkon}
      >
        <hr className="box__linje-bred" />
        <Folkeregisteret personalia={this.props.personalia} />
      </Box>
    );
  }
}

export default Personalia;
