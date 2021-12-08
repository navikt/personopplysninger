import React from "react";
import Kilde from "../../../../../../../components/kilde/Kilde";

interface Props {
  kilde?: String;
}

const Oppholdsadresse = (props: Props) => {
  switch (props.kilde) {
    case "pdl":
      return <Kilde kilde={"personalia.source.nav"} lenkeType={"INGEN"}/>;
    case "freg":
      return <Kilde kilde={"personalia.source.folkeregisteret"} lenkeType={"INGEN"}/>;
    default:
      return null;
  }
};

export default Oppholdsadresse;
