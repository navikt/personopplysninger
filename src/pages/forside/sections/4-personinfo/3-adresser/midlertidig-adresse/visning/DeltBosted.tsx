import React from "react";
import { DeltBosted as IDeltBosted } from "types/adresser/deltbosted";
import Vegadresse from "./norske-adresser/Vegadresse";
import UtenlanskAdresse from "./utenlanske-adresser/UtenlanskAdresse";
import Matrikkeladresse from "./norske-adresser/Matrikkeladresse";
import Ukjentbosted from "./norske-adresser/Ukjentbosted";
import {Undertittel} from "nav-frontend-typografi";
import {FormattedMessage} from "react-intl";
import AdresseKilde from "./AdresseKilde";

interface Props {
  deltBosted: IDeltBosted;
}

const DeltBosted = (props: Props) => {
  let adresse;
  switch (props.deltBosted?.adresse?.type) {
    case "VEGADRESSE":
      adresse = <Vegadresse {...props.deltBosted?.adresse} coAdressenavn={props.deltBosted?.coAdressenavn } />;
      break;
    case "MATRIKKELADRESSE":
      adresse = <Matrikkeladresse {...props.deltBosted?.adresse} coAdressenavn={props.deltBosted?.coAdressenavn } />;
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
      <>
        <div className="underseksjon__header underseksjon__divider">
          <Undertittel>
            <FormattedMessage id={"adresse.deltbosted"} />
          </Undertittel>
        </div>
        <div>
          {adresse}
          <AdresseKilde kilde={props.deltBosted.kilde as string}/>
        </div>
      </>
  );
};

export default DeltBosted;
