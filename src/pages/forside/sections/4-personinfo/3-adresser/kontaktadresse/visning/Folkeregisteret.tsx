import React from "react";
import Kilde from "components/kilde/Kilde";
import { Undertittel } from "nav-frontend-typografi";
import { FormattedMessage } from "react-intl";
import eksternLenkeIkon from "../../../../../../../assets/img/Link.svg";
import { Bostedsadresse as IBostedsadresse } from "../../../../../../../types/adresser/bostedsadresse";
import { DeltBosted as IDeltBosted } from "../../../../../../../types/adresser/deltbosted";
import { Oppholdsadresse as IOppholdsadresse } from "../../../../../../../types/adresser/oppholdsadresse";
import Bostedsadresse from "./Bostedsadresse";
import DeltBosted from "./DeltBosted";
import Oppholdsadresse from "./Oppholdsadresse";
import { useStore } from "../../../../../../../store/Context";

interface Props {
  bostedsadresse?: IBostedsadresse;
  deltBosted?: IDeltBosted;
  oppholdsadresse?: IOppholdsadresse;
}

const Folkeregisteret = (props: Props) => {
  const [{ locale }] = useStore();
  const { bostedsadresse, deltBosted, oppholdsadresse } = props;

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
