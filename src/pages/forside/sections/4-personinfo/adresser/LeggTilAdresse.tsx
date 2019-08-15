import React from "react";
import AdressePanel from "../../../../../components/adresse/AdressePanel";
import Melding from "../../../../../components/melding/Melding";

const LeggTilAdresse = () => (
  <AdressePanel tittel="adresse.midlertidigadresse">
    <Melding meldingId="adresse.midlertidigadresse.leggtil.beskrivelse" />
  </AdressePanel>
);

export default LeggTilAdresse;
