import React from "react";
import Kilde from "components/kilde/Kilde";
import { Undertittel } from "nav-frontend-typografi";
import { FormattedMessage } from "react-intl";
import eksternLenkeIkon from "../../../../../../assets/img/Link.svg";
import { Bostedsadresse as IBostedsadresse } from "../../../../../../types/adresser/bostedsadresse";
import { DeltBosted as IDeltBosted } from "../../../../../../types/adresser/deltbosted";
import { Oppholdsadresse as IOppholdsadresse } from "../../../../../../types/adresser/oppholdsadresse";
import { Kontaktadresse as IKontaktadresse } from "../../../../../../types/adresser/kontaktadresse";
import Adresse from "./Adresse";
import { useStore } from "../../../../../../store/Context";

interface Props {
  bostedsadresse?: IBostedsadresse;
  deltBosted?: IDeltBosted;
  oppholdsadresse?: IOppholdsadresse;
  kontaktadresser: IKontaktadresse[];
}

const Folkeregisteret = (props: Props) => {
  const [{ locale }] = useStore();
  const { bostedsadresse, deltBosted, oppholdsadresse, kontaktadresser } = props;

  let key = 0;

  if (!(bostedsadresse || deltBosted || oppholdsadresse || kontaktadresser)) { return null; }

  return (
    <div>
      <div className="underseksjon__header">
        <Undertittel>
          <FormattedMessage id="adresse.overskrift" />
        </Undertittel>
      </div>

      {bostedsadresse && <Adresse adresse={bostedsadresse?.adresse}
                                  coAdressenavn={bostedsadresse.coAdressenavn}
                                  angittFlyttedato={bostedsadresse.angittFlyttedato}
                                  tittel={"adresse.bostedsadresse"}/>}
      {deltBosted && <Adresse adresse={deltBosted?.adresse}
                              coAdressenavn={deltBosted.coAdressenavn}
                              tittel={"adresse.deltbosted"}/>}
      {oppholdsadresse && <Adresse adresse={oppholdsadresse?.adresse}
                                   coAdressenavn={oppholdsadresse.coAdressenavn}
                                   tittel={"adresse.oppholdsadresse"}/>}

      {kontaktadresser.map(adr => {
          let tittel;
          let utenlandskeAdressetyper = ["UTENLANDSK_ADRESSE", "UTENLANDSK_ADRESSE_I_FRITT_FORMAT"];
          if (utenlandskeAdressetyper.includes(adr.adresse?.type!)) {
              tittel = "adresse.kontaktadresse.utenlandsk";
          } else {
              if (kontaktadresser.filter(kontaktadresse => utenlandskeAdressetyper.includes(kontaktadresse.adresse?.type!)).length > 0) {
                  // Må spesifiseres som norsk dersom bruker har registert utenlandsk kontaktadresse i tillegg
                  tittel = "adresse.kontaktadresse.norsk";
              } else {
                  tittel = "adresse.kontaktadresse";
              }
          }
          return (<Adresse adresse={adr.adresse}
                           coAdressenavn={adr.coAdressenavn}
                           gyldigTilOgMed={adr.gyldigTilOgMed}
                           tittel={tittel}
                           key={key++}/>);
      })}
      {/* Kilde vil alltid være FREG i prod, kan være PDL i dev */}
      <Kilde
          kilde="personalia.source.folkeregisteret"
          lenke={
              locale === "en"
                  ? "https://www.skatteetaten.no/en/person/national-registry/moving/"
                  : "https://www.skatteetaten.no/person/folkeregister/flytte/"
          }
          lenkeTekst="personalia.link.folkeregisteret.adresse"
          lenkeType={"EKSTERN"}
          ikon={eksternLenkeIkon}
      />
    </div>
  );
};

export default Folkeregisteret;
