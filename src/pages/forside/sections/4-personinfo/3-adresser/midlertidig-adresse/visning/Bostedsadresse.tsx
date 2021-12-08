import React from "react";
import { Bostedsadresse as IBostedsadresse } from "types/adresser/bostedsadresse";
import Vegadresse from "./norske-adresser/Vegadresse";
import UtenlanskAdresse from "./utenlanske-adresser/UtenlanskAdresse";
import Matrikkeladresse from "./norske-adresser/Matrikkeladresse";
import Ukjentbosted from "./norske-adresser/Ukjentbosted";

interface Props {
  bostedsadresse: IBostedsadresse;
}

const Bostedsadresse = (props: Props) => {
  switch (props.bostedsadresse?.adresse?.type) {
    // Tilleggsinfo panel
    case "VEGADRESSE":
      return <Vegadresse {...props.bostedsadresse?.adresse} coAdressenavn={props.bostedsadresse?.coAdressenavn } />;
    case "MATRIKKELADRESSE":
      return <Matrikkeladresse {...props.bostedsadresse?.adresse} coAdressenavn={props.bostedsadresse?.coAdressenavn } />;
    case "UTENLANDSK_ADRESSE":
      return <UtenlanskAdresse {...props.bostedsadresse?.adresse} coAdressenavn={props.bostedsadresse?.coAdressenavn } />;
    case "UKJENTBOSTED":
      return <Ukjentbosted {...props.bostedsadresse?.adresse} coAdressenavn={props.bostedsadresse?.coAdressenavn } />;
    default:
      return null;
  }
};

export default Bostedsadresse;
