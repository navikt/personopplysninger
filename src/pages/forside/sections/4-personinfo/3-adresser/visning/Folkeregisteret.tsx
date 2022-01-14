import React from "react";
import Kilde from "components/kilde/Kilde";
import { Normaltekst, Undertittel } from "nav-frontend-typografi";
import { FormattedMessage } from "react-intl";
import eksternLenkeIkon from "../../../../../../assets/img/Link.svg";
import { Bostedsadresse as IBostedsadresse } from "../../../../../../types/adresser/bostedsadresse";
import { DeltBosted as IDeltBosted } from "../../../../../../types/adresser/deltbosted";
import { Oppholdsadresse as IOppholdsadresse } from "../../../../../../types/adresser/oppholdsadresse";
import { Kontaktadresse as IKontaktadresse } from "../../../../../../types/adresser/kontaktadresse";
import Bostedsadresse from "./adresser/Bostedsadresse";
import DeltBosted from "./adresser/DeltBosted";
import Oppholdsadresse from "./adresser/Oppholdsadresse";
import Kontaktadresse from "./adresser/Kontaktadresse";
import { useStore } from "../../../../../../store/Context";
import AdressePanel from "../komponenter/AdressePanel";

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

  if (!(bostedsadresse || deltBosted || oppholdsadresse)) { return null; }

  return (
    <div>
      <div className="underseksjon__header">
        <Undertittel>
          <FormattedMessage id="adresse.overskrift" />
        </Undertittel>
      </div>

      {bostedsadresse && <Bostedsadresse bostedsadresse={bostedsadresse}/>}
      {deltBosted && <DeltBosted deltBosted={deltBosted}/>}
      {oppholdsadresse && <Oppholdsadresse oppholdsadresse={oppholdsadresse}/>}

      {kontaktadresser.map(adr => { return (<Kontaktadresse kontaktadresse={adr} key={key++}/>); })}
      {kontaktadresser.length === 0 && (
          <AdressePanel tittel={"adresse.kontaktadresse"}>
              <Normaltekst>
                  <FormattedMessage
                      id="adresse.kontaktadresse.leggtil.beskrivelse"
                      values={{
                          br: (text: String) => (
                              <>
                                  <br />
                                  {text}
                              </>
                          ),
                      }}
                  />
              </Normaltekst>
          </AdressePanel>
      )
      }
      {/* Kilde vil alltid være FREG i prod, kan være PDL i dev */}
      <Kilde
          kilde="personalia.source.folkeregisteret"
          lenke={
              locale === "en"
                  ? "https://www.skatteetaten.no/en/person/national-registry/"
                  : "https://www.skatteetaten.no/person/folkeregister/"
          }
          lenkeTekst="personalia.link.folkeregisteret"
          lenkeType={"EKSTERN"}
          ikon={eksternLenkeIkon}
      />
    </div>
  );
};

export default Folkeregisteret;
