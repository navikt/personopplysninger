import React, { Component } from "react";
import Box from "../../../../../components/box/Box";
import kontaktIkon from "../../../../../assets/img/Kontakt.svg";
import TelefonnummerHosNav from "./subsections/TelefonnummerHosNav";
import DKIF from "./subsections/kontakt-og-reservasjonsregisteret/KontaktInfoFetch";
import { Personalia as PersonaliaType } from "../../../../../types/personalia";

interface Props {
  personalia: PersonaliaType;
}

class KontaktInfo extends Component<Props> {
  render() {
    return (
      <Box
        id="kontaktinformasjon"
        tittel="kontaktinfo.tittel"
        icon={kontaktIkon}
      >
        <hr className="box__linje-bred" />
        <TelefonnummerHosNav tlfnr={this.props.personalia.tlfnr} />
        <DKIF />
      </Box>
    );
  }
}

export default KontaktInfo;
