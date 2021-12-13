import React from "react";
import Kilde from "components/kilde/Kilde";
import { Undertittel } from "nav-frontend-typografi";
import { FormattedMessage } from "react-intl";
import { Bostedsadresse as IBostedsadresse } from "../../../../../../../types/adresser/bostedsadresse";
import { DeltBosted as IDeltBosted } from "../../../../../../../types/adresser/deltbosted";
import { Oppholdsadresse as IOppholdsadresse } from "../../../../../../../types/adresser/oppholdsadresse";
import Bostedsadresse from "./Bostedsadresse";
import DeltBosted from "./DeltBosted";
import Oppholdsadresse from "./Oppholdsadresse";

interface Props {
  bostedsadresse?: IBostedsadresse;
  deltBosted?: IDeltBosted;
  oppholdsadresse?: IOppholdsadresse;
}

const Folkeregisteret = (props: Props) => {
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
      <Kilde kilde={"personalia.source.folkeregisteret"} lenkeType={"INGEN"}/>
    </div>
  );
};

export default Folkeregisteret;
