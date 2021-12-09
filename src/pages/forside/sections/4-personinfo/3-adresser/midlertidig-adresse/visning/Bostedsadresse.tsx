import React from "react";
import { Bostedsadresse as IBostedsadresse } from "types/adresser/bostedsadresse";
import Vegadresse from "./norske-adresser/Vegadresse";
import UtenlanskAdresse from "./utenlanske-adresser/UtenlanskAdresse";
import Matrikkeladresse from "./norske-adresser/Matrikkeladresse";
import Ukjentbosted from "./norske-adresser/Ukjentbosted";
import AdresseKilde from "./AdresseKilde";
import AdressePanel from "../../komponenter/AdressePanel";
import moment from "moment";
import "moment/locale/nb";
import Lesmerpanel from "nav-frontend-lesmerpanel";
import ListElement from "../../../../../../../components/listelement/ListElement";
import { useIntl } from "react-intl";

moment.locale("nb");

interface Props {
  bostedsadresse: IBostedsadresse;
}

const Bostedsadresse = (props: Props) => {
  const { formatMessage: msg } = useIntl();
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
      <AdressePanel tittel={"adresse.bostedsadresse"}>
        <>
          {adresse}
          {(bruksenhetsnummer || kommune || flyttedatoFormatert) && (
              <Lesmerpanel
                  className="adresse__lesmer"
                  apneTekst={msg({ id: "adresse.bostedsadresse.apneTekst" })}
                  lukkTekst={msg({ id: "adresse.bostedsadresse.lukkTekst" })}
              >
                <ul className="list-column-2 address-columns">
                  {bruksenhetsnummer && (
                      <ListElement
                          titleId="adresse.bolignummer"
                          content={bruksenhetsnummer}
                      />
                  )}
                  {kommune && (
                      <ListElement titleId="adresse.kommune" content={kommune} />
                  )}
                  {flyttedatoFormatert && (
                      <ListElement titleId="adresse.dato" content={flyttedatoFormatert} />
                  )}
                </ul>
              </Lesmerpanel>
          )}
          <AdresseKilde kilde={props.bostedsadresse.kilde as string}/>
        </>
      </AdressePanel>
  );
};

export default Bostedsadresse;
