import React from "react";
import { Oppholdsadresse as IOppholdsadresse } from "types/adresser/oppholdsadresse";
import Vegadresse from "../adressetyper/norske-adresser/Vegadresse";
import UtenlanskAdresse from "../adressetyper/utenlanske-adresser/UtenlanskAdresse";
import Matrikkeladresse from "../adressetyper/norske-adresser/Matrikkeladresse";
import AdressePanel from "../../komponenter/AdressePanel";
import "moment/locale/nb";

interface Props {
  oppholdsadresse: IOppholdsadresse;
}

const Oppholdsadresse = (props: Props) => {
  let adresse;
  let kommune;
  let bruksenhetsnummer;

  switch (props.oppholdsadresse?.adresse?.type) {
    case "VEGADRESSE":
      adresse = <Vegadresse {...props.oppholdsadresse?.adresse}
                            coAdressenavn={props.oppholdsadresse?.coAdressenavn}
                            bruksenhetsnummer={""}/>;
      kommune = props.oppholdsadresse.adresse?.kommune;
      bruksenhetsnummer = props.oppholdsadresse.adresse?.bruksenhetsnummer;
      break;
    case "MATRIKKELADRESSE":
      adresse = <Matrikkeladresse {...props.oppholdsadresse?.adresse}
                                  coAdressenavn={props.oppholdsadresse?.coAdressenavn}
                                  bruksenhetsnummer={""}/>;
      kommune = props.oppholdsadresse.adresse?.kommune;
      bruksenhetsnummer = props.oppholdsadresse.adresse?.bruksenhetsnummer;
      break;
    case "UTENLANDSK_ADRESSE":
      adresse =
        <UtenlanskAdresse {...props.oppholdsadresse?.adresse} coAdressenavn={props.oppholdsadresse?.coAdressenavn}/>;
      break;
    default:
      return null;
  }

  return (
    <AdressePanel tittel={"adresse.oppholdsadresse"}
                  bruksenhetsnummer={bruksenhetsnummer}
                  kommune={kommune}>
      {adresse}
    </AdressePanel>
  );
};

export default Oppholdsadresse;
