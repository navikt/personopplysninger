import React from "react";
import { DeltBosted as IDeltBosted } from "types/adresser/deltbosted";
import Vegadresse from "../adressetyper/norske-adresser/Vegadresse";
import UtenlanskAdresse from "../adressetyper/utenlanske-adresser/UtenlanskAdresse";
import Matrikkeladresse from "../adressetyper/norske-adresser/Matrikkeladresse";
import Ukjentbosted from "../adressetyper/norske-adresser/Ukjentbosted";
import AdressePanel from "../../komponenter/AdressePanel";
import "moment/locale/nb";

interface Props {
  deltBosted: IDeltBosted;
}

const DeltBosted = (props: Props) => {
  let adresse;
  let kommune;
  let bruksenhetsnummer;

  switch (props.deltBosted?.adresse?.type) {
    case "VEGADRESSE":
      adresse = <Vegadresse {...props.deltBosted?.adresse}
                            coAdressenavn={props.deltBosted?.coAdressenavn}
                            bruksenhetsnummer={""} />;
      kommune = props.deltBosted.adresse?.kommune;
      bruksenhetsnummer = props.deltBosted.adresse?.bruksenhetsnummer;
      break;
    case "MATRIKKELADRESSE":
      adresse = <Matrikkeladresse {...props.deltBosted?.adresse}
                                  coAdressenavn={props.deltBosted?.coAdressenavn}
                                  bruksenhetsnummer={""} />;
      kommune = props.deltBosted.adresse?.kommune;
      bruksenhetsnummer = props.deltBosted.adresse?.bruksenhetsnummer;
      break;
    case "UTENLANDSK_ADRESSE":
      adresse = <UtenlanskAdresse {...props.deltBosted?.adresse} coAdressenavn={props.deltBosted?.coAdressenavn } />;
      break;
    case "UKJENTBOSTED":
      adresse = <Ukjentbosted {...props.deltBosted?.adresse} coAdressenavn={props.deltBosted?.coAdressenavn } />;
      break;
    default:
      return null;
  }

  return (
    <AdressePanel tittel={"adresse.deltbosted"}
                  bruksenhetsnummer={bruksenhetsnummer}
                  kommune={kommune}>
      {adresse}
    </AdressePanel>
  );
};

export default DeltBosted;
