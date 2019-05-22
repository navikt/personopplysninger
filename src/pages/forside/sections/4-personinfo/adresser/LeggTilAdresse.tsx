import React from "react";
import Kilde from "../../../../../components/kilde/Kilde";
import AdressePanel from "../../../../../components/adresse/AdressePanel";
import Environment from "../../../../../utils/Environments";
import Melding from "../../../../../components/melding/Melding";

const { tjenesteUrl } = Environment();

const LeggTilAdresse = () => (
  <AdressePanel tittel="adresse.midlertidigadresse">
    <>
      <Melding meldingId="adresse.midlertidigadresse.leggtil.beskrivelse" />
      <Kilde
        kilde="personalia.source.nav"
        lenke={`${tjenesteUrl}/brukerprofil/`}
        lenkeTekst="personalia.link.brukerprofil.leggtil"
      />
    </>
  </AdressePanel>
);

export default LeggTilAdresse;
