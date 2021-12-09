import React from "react";
import { Oppholdsadresse as IOppholdsadresse } from "types/adresser/oppholdsadresse";
import Vegadresse from "./norske-adresser/Vegadresse";
import UtenlanskAdresse from "./utenlanske-adresser/UtenlanskAdresse";
import Matrikkeladresse from "./norske-adresser/Matrikkeladresse";
import {Undertittel} from "nav-frontend-typografi";
import {FormattedMessage} from "react-intl";
import AdresseKilde from "./AdresseKilde";

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
      <>
        <div className="underseksjon__header underseksjon__divider">
          <Undertittel>
            <FormattedMessage id={"adresse.oppholdsadresse"} />
          </Undertittel>
        </div>
        <div>
          {adresse}
          <AdresseKilde kilde={props.oppholdsadresse.kilde as string}/>
        </div>
      </>
  );
};

export default Oppholdsadresse;
