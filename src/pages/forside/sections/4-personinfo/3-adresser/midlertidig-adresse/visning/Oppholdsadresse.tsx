import React from "react";
import { Oppholdsadresse as IOppholdsadresse } from "types/adresser/oppholdsadresse";
import Vegadresse from "./norske-adresser/Vegadresse";
import UtenlanskAdresse from "./utenlanske-adresser/UtenlanskAdresse";
import Matrikkeladresse from "./norske-adresser/Matrikkeladresse";

interface Props {
  oppholdsadresse: IOppholdsadresse;
}

const Oppholdsadresse = (props: Props) => {
  switch (props.oppholdsadresse?.adresse?.type) {
    case "VEGADRESSE":
      return <Vegadresse {...props.oppholdsadresse?.adresse} coAdressenavn={props.oppholdsadresse?.coAdressenavn } />;
    case "MATRIKKELADRESSE":
      return <Matrikkeladresse {...props.oppholdsadresse?.adresse} coAdressenavn={props.oppholdsadresse?.coAdressenavn } />;
    case "UTENLANDSK_ADRESSE":
      return <UtenlanskAdresse {...props.oppholdsadresse?.adresse} coAdressenavn={props.oppholdsadresse?.coAdressenavn } />;
    default:
      return null;
  }
};

export default Oppholdsadresse;
