import React from "react";
import AdressePanel from "../../../../../components/adresse/AdressePanel";
import { Normaltekst } from "nav-frontend-typografi";
import { FormattedHTMLMessage } from "react-intl";

const LeggTilAdresse = () => (
  <AdressePanel tittel="adresse.midlertidigadresse">
    <Normaltekst>
      <FormattedHTMLMessage id="adresse.midlertidigadresse.leggtil.beskrivelse" />
    </Normaltekst>
  </AdressePanel>
);

export default LeggTilAdresse;
