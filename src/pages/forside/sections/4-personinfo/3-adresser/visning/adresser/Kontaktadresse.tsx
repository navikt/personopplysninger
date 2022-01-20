import React from "react";
import { Kontaktadresse as IKontaktadresse } from "types/adresser/kontaktadresse";
import PostadresseIFrittFormat from "../adressetyper/norske-adresser/PostadresseIFrittFormat";
import UtenlanskAdresseIFrittFormat from "../adressetyper/utenlanske-adresser/UtenlanskAdresseIFrittFormat";
import Vegadresse from "../adressetyper/norske-adresser/Vegadresse";
import Postboksadresse from "../adressetyper/norske-adresser/Postboksadresse";
import UtenlanskAdresse from "../adressetyper/utenlanske-adresser/UtenlanskAdresse";
import AdressePanel from "../../komponenter/AdressePanel";
import { useIntl } from "react-intl";
import moment from "moment";
import Lesmerpanel from "nav-frontend-lesmerpanel";
import ListElement from "../../../../../../../components/listelement/ListElement";

interface Props {
  kontaktadresse: IKontaktadresse;
  tittel: string;
}

const Kontaktadresse = (props: Props) => {
  const { formatMessage: msg } = useIntl();
  const gyldigTilOgMed = props.kontaktadresse.gyldigTilOgMed;
  const gyldigTilOgMedFormatert = gyldigTilOgMed ? moment(gyldigTilOgMed).format("L") : "";

  let adresse;
  let kommune;
  let bruksenhetsnummer;

  switch (props.kontaktadresse?.adresse?.type) {
    case "POSTADRESSE_I_FRITT_FORMAT":
      adresse = <PostadresseIFrittFormat {...props.kontaktadresse?.adresse} />;
      break;
    case "UTENLANDSK_ADRESSE_I_FRITT_FORMAT":
      adresse = <UtenlanskAdresseIFrittFormat {...props.kontaktadresse?.adresse} />;
      break;
    case "VEGADRESSE":
      adresse = <Vegadresse {...props.kontaktadresse?.adresse} coAdressenavn={props.kontaktadresse?.coAdressenavn } />;
      kommune = props.kontaktadresse.adresse?.kommune;
      bruksenhetsnummer = props.kontaktadresse.adresse?.bruksenhetsnummer;
      break;
    case "POSTBOKSADRESSE":
      adresse = <Postboksadresse {...props.kontaktadresse?.adresse} coAdressenavn={props.kontaktadresse?.coAdressenavn } />;
      break;
    case "UTENLANDSK_ADRESSE":
      adresse = <UtenlanskAdresse {...props.kontaktadresse?.adresse} coAdressenavn={props.kontaktadresse?.coAdressenavn } />;
      break;
    default:
      return null;
  }

  return (
      <AdressePanel tittel={props.tittel}>
        <>
          {adresse}
          {(bruksenhetsnummer || kommune || gyldigTilOgMedFormatert) && (
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
                  {gyldigTilOgMedFormatert && (
                      <ListElement titleId="adresse.dato.gyldigtil" content={gyldigTilOgMedFormatert} />
                  )}
                </ul>
              </Lesmerpanel>
          )}
        </>
      </AdressePanel>
  );
};

export default Kontaktadresse;
