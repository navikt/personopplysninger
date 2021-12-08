import React from "react";
import { DeltBosted as IDeltBosted } from "types/adresser/deltbosted";
import Vegadresse from "./norske-adresser/Vegadresse";
import UtenlanskAdresse from "./utenlanske-adresser/UtenlanskAdresse";
import Matrikkeladresse from "./norske-adresser/Matrikkeladresse";
import Ukjentbosted from "./norske-adresser/Ukjentbosted";

interface Props {
  deltBosted: IDeltBosted;
}

const DeltBosted = (props: Props) => {
  switch (props.deltBosted?.adresse?.type) {
    case "VEGADRESSE":
      return <Vegadresse {...props.deltBosted?.adresse} coAdressenavn={props.deltBosted?.coAdressenavn } />;
    case "MATRIKKELADRESSE":
      return <Matrikkeladresse {...props.deltBosted?.adresse} coAdressenavn={props.deltBosted?.coAdressenavn } />;
    case "UTENLANDSK_ADRESSE":
      return <UtenlanskAdresse {...props.deltBosted?.adresse} coAdressenavn={props.deltBosted?.coAdressenavn } />;
    case "UKJENTBOSTED":
      return <Ukjentbosted {...props.deltBosted?.adresse} coAdressenavn={props.deltBosted?.coAdressenavn } />;
    default:
      return null;
  }
};

export default DeltBosted;
