import React from "react";
import { Bostedsadresse as IBostedsadresse } from "types/adresser/bostedsadresse";
import Vegadresse from "../adressetyper/norske-adresser/Vegadresse";
import UtenlanskAdresse from "../adressetyper/utenlanske-adresser/UtenlanskAdresse";
import Matrikkeladresse from "../adressetyper/norske-adresser/Matrikkeladresse";
import Ukjentbosted from "../adressetyper/norske-adresser/Ukjentbosted";
import AdressePanel from "../../komponenter/AdressePanel";
import moment from "moment";
import "moment/locale/nb";

moment.locale("nb");

interface Props {
  bostedsadresse: IBostedsadresse;
}

const Bostedsadresse = (props: Props) => {
  const flyttedato = props.bostedsadresse.angittFlyttedato;
  const flyttedatoFormatert = flyttedato ? moment(flyttedato).format("L") : "";

  let adresse;
  let kommune;
  let bruksenhetsnummer;

  switch (props.bostedsadresse?.adresse?.type) {
    case "VEGADRESSE":
      adresse = <Vegadresse {...props.bostedsadresse?.adresse}
                            coAdressenavn={props.bostedsadresse?.coAdressenavn }
                            bruksenhetsnummer={""}/>;
      kommune = props.bostedsadresse.adresse?.kommune;
      bruksenhetsnummer = props.bostedsadresse.adresse?.bruksenhetsnummer;
      break;
    case "MATRIKKELADRESSE":
      adresse = <Matrikkeladresse {...props.bostedsadresse?.adresse}
                                  coAdressenavn={props.bostedsadresse?.coAdressenavn }
                                  bruksenhetsnummer={""}/>;
      kommune = props.bostedsadresse.adresse?.kommune;
      bruksenhetsnummer = props.bostedsadresse.adresse?.bruksenhetsnummer;
      break;
    case "UTENLANDSK_ADRESSE":
      adresse = <UtenlanskAdresse {...props.bostedsadresse?.adresse} coAdressenavn={props.bostedsadresse?.coAdressenavn } />;
      break;
    case "UKJENTBOSTED":
      adresse = <Ukjentbosted {...props.bostedsadresse?.adresse} coAdressenavn={props.bostedsadresse?.coAdressenavn } />;
      break;
    default:
      return null;
  }

  return (
    <AdressePanel tittel={"adresse.bostedsadresse"}
                  bruksenhetsnummer={bruksenhetsnummer}
                  kommune={kommune}
                  flyttedatoFormatert={flyttedatoFormatert}>
      {adresse}
    </AdressePanel>
  );
};

export default Bostedsadresse;
