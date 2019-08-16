import React from "react";
import { Normaltekst } from "nav-frontend-typografi";
import { UtenlandskAdresse as UtenlandskAdresseType } from "../../../../../../types/adresser/utenlandskadresse";
import AdressePanel from "../../../../../../components/adresse/AdressePanel";
import GateAdresse from "../../../../../../components/adresse/GateAdresse";

interface Props {
  utenlandskadresse: UtenlandskAdresseType;
}

const UtenlandskAdresse = (props: Props) => {
  const { adresse1, adresse2, adresse3, land } = props.utenlandskadresse;
  return (
    <AdressePanel tittel="adresse.utenlandskadresse">
      <>
        <GateAdresse
          adresse1={adresse1}
          adresse2={adresse2}
          adresse3={adresse3}
        />
        {land && (
          <div className="adresse__linje">
            <Normaltekst>{land}</Normaltekst>
          </div>
        )}
      </>
    </AdressePanel>
  );
};

export default UtenlandskAdresse;
