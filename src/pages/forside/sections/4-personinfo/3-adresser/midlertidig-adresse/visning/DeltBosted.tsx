import React from "react";
import { DeltBosted as IDeltBosted } from "types/adresser/deltbosted";
import Vegadresse from "./norske-adresser/Vegadresse";
import UtenlanskAdresse from "./utenlanske-adresser/UtenlanskAdresse";
import Matrikkeladresse from "./norske-adresser/Matrikkeladresse";
import Ukjentbosted from "./norske-adresser/Ukjentbosted";
import AdresseKilde from "./AdresseKilde";
import AdressePanel from "../../komponenter/AdressePanel";
import "moment/locale/nb";
import Lesmerpanel from "nav-frontend-lesmerpanel";
import ListElement from "../../../../../../../components/listelement/ListElement";
import { useIntl } from "react-intl";

interface Props {
  deltBosted: IDeltBosted;
}

const DeltBosted = (props: Props) => {
  const { formatMessage: msg } = useIntl();

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
      <AdressePanel tittel={"adresse.deltbosted"}>
        <>
          {adresse}
          {(bruksenhetsnummer || kommune) && (
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
                </ul>
              </Lesmerpanel>
          )}
          <AdresseKilde kilde={props.deltBosted.kilde as string}/>
        </>
      </AdressePanel>
  );
};

export default DeltBosted;
