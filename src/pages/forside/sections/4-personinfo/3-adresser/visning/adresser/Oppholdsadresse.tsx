import React from "react";
import { Oppholdsadresse as IOppholdsadresse } from "types/adresser/oppholdsadresse";
import Vegadresse from "../adressetyper/norske-adresser/Vegadresse";
import UtenlanskAdresse from "../adressetyper/utenlanske-adresser/UtenlanskAdresse";
import Matrikkeladresse from "../adressetyper/norske-adresser/Matrikkeladresse";
import AdressePanel from "../../komponenter/AdressePanel";
import "moment/locale/nb";
import Lesmerpanel from "nav-frontend-lesmerpanel";
import ListElement from "../../../../../../../components/listelement/ListElement";
import { useIntl } from "react-intl";

interface Props {
  oppholdsadresse: IOppholdsadresse;
}

const Oppholdsadresse = (props: Props) => {
  const { formatMessage: msg } = useIntl();

  let adresse;
  let kommune;
  let bruksenhetsnummer;

  switch (props.oppholdsadresse?.adresse?.type) {
    case "VEGADRESSE":
      adresse = <Vegadresse {...props.oppholdsadresse?.adresse}
                            coAdressenavn={props.oppholdsadresse?.coAdressenavn }
                            bruksenhetsnummer={""}/>;
      kommune = props.oppholdsadresse.adresse?.kommune;
      bruksenhetsnummer = props.oppholdsadresse.adresse?.bruksenhetsnummer;
      break;
    case "MATRIKKELADRESSE":
      adresse = <Matrikkeladresse {...props.oppholdsadresse?.adresse}
                                  coAdressenavn={props.oppholdsadresse?.coAdressenavn }
                                  bruksenhetsnummer={""}/>;
      kommune = props.oppholdsadresse.adresse?.kommune;
      bruksenhetsnummer = props.oppholdsadresse.adresse?.bruksenhetsnummer;
      break;
    case "UTENLANDSK_ADRESSE":
      adresse = <UtenlanskAdresse {...props.oppholdsadresse?.adresse} coAdressenavn={props.oppholdsadresse?.coAdressenavn } />;
      break;
    default:
      return null;
  }

  return (
      <AdressePanel tittel={"adresse.oppholdsadresse"}>
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
        </>
      </AdressePanel>
  );
};

export default Oppholdsadresse;
