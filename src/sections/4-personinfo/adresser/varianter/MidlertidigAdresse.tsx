import React from "react";
import AdressePanel from "../../../../components/adresse/AdressePanel";
import GateAdresse from "../../../../components/adresse/GateAdresse";
import Postnummer from "../../../../components/adresse/Postnummer";
import { Tilleggsadresse } from "../../../../types/adresser/tilleggsadresse";
import Kilde from "../../../../components/kilde/Kilde";
import Environment from "../../../../utils/Environments";

const { tjenesteUrl } = Environment();

interface Props {
  tilleggsadresse: Tilleggsadresse;
}

const MidlertidigAdresse = (props: Props) => {
  const {
    adresse1,
    adresse2,
    adresse3,
    postnummer,
    poststed
  } = props.tilleggsadresse;
  return (
    <AdressePanel tittel="adresse.midlertidigadresse">
      <>
        <GateAdresse
          adresse1={adresse1}
          adresse2={adresse2}
          adresse3={adresse3}
        />
        <Postnummer postnummer={postnummer} poststed={poststed} />
        <Kilde
          kilde="personalia.source.nav"
          lenke={`${tjenesteUrl}/brukerprofil/`}
          lenkeTekst="personalia.link.brukerprofil.endre"
        />
      </>
    </AdressePanel>
  );
};

export default MidlertidigAdresse;
