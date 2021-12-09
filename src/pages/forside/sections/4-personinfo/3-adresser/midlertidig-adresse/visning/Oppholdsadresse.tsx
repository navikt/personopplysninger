import React from "react";
import { Oppholdsadresse as IOppholdsadresse } from "types/adresser/oppholdsadresse";
import Vegadresse from "./norske-adresser/Vegadresse";
import UtenlanskAdresse from "./utenlanske-adresser/UtenlanskAdresse";
import Matrikkeladresse from "./norske-adresser/Matrikkeladresse";
import AdresseKilde from "./AdresseKilde";
import AdressePanel from "../../komponenter/AdressePanel";

interface Props {
  oppholdsadresse: IOppholdsadresse;
}

const Oppholdsadresse = (props: Props) => {
  let adresse;
  switch (props.oppholdsadresse?.adresse?.type) {
    case "VEGADRESSE":
      adresse = <Vegadresse {...props.oppholdsadresse?.adresse} coAdressenavn={props.oppholdsadresse?.coAdressenavn } />;
      break;
    case "MATRIKKELADRESSE":
      adresse = <Matrikkeladresse {...props.oppholdsadresse?.adresse} coAdressenavn={props.oppholdsadresse?.coAdressenavn } />;
      break;
    case "UTENLANDSK_ADRESSE":
      adresse = <UtenlanskAdresse {...props.oppholdsadresse?.adresse} coAdressenavn={props.oppholdsadresse?.coAdressenavn } />;
      break;
    default:
      return null;
  }

  return (
      <AdressePanel tittel={"adresse.oppholdsadresse"}>
        <div>
          {adresse}
          <AdresseKilde kilde={props.oppholdsadresse.kilde as string}/>
        </div>
      </AdressePanel>
  );
};

export default Oppholdsadresse;
