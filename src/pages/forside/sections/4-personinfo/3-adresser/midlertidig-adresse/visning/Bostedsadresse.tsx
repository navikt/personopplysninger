import React from "react";
import { Bostedsadresse as IBostedsadresse } from "types/adresser/bostedsadresse";
import Vegadresse from "./norske-adresser/Vegadresse";
import UtenlanskAdresse from "./utenlanske-adresser/UtenlanskAdresse";
import Matrikkeladresse from "./norske-adresser/Matrikkeladresse";
import Ukjentbosted from "./norske-adresser/Ukjentbosted";
import { Undertittel } from "nav-frontend-typografi";
import { FormattedMessage } from "react-intl";
import AdresseKilde from "./AdresseKilde";

interface Props {
  bostedsadresse: IBostedsadresse;
}

const Bostedsadresse = (props: Props) => {
  let adresse;
  switch (props.bostedsadresse?.adresse?.type) {
    case "VEGADRESSE":
      adresse = <Vegadresse {...props.bostedsadresse?.adresse} coAdressenavn={props.bostedsadresse?.coAdressenavn } />;
      break;
    case "MATRIKKELADRESSE":
      adresse = <Matrikkeladresse {...props.bostedsadresse?.adresse} coAdressenavn={props.bostedsadresse?.coAdressenavn } />;
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
      <>
        <div className="underseksjon__header underseksjon__divider">
          <Undertittel>
            <FormattedMessage id={"adresse.bostedsadresse"} />
          </Undertittel>
        </div>
        <div>
          {adresse}
          <AdresseKilde kilde={props.bostedsadresse.kilde as string}/>
        </div>
      </>
  );
};

export default Bostedsadresse;
