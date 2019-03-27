import React from "react";
import { Normaltekst } from "nav-frontend-typografi";
import { FormattedHTMLMessage } from "react-intl";
import Kilde from "../../../components/kilde/Kilde";
import AdressePanel from "../../../components/adresse/AdressePanel";
import Environment from "../../../utils/Environments";

const { tjenesteUrl } = Environment();

const LeggTilAdresse = () => (
  <AdressePanel tittel="adresse.midlertidigadresse">
    <>
      <div className="message">
        <Normaltekst>
          <FormattedHTMLMessage id="adresse.midlertidigadresse.leggtil.beskrivelse" />
        </Normaltekst>
      </div>
      <Kilde
        tekst="personalia.source.nav"
        lenkeTekst="personalia.link.brukerprofil.leggtil"
        href={`${tjenesteUrl}/brukerprofil/`}
      />
    </>
  </AdressePanel>
);

export default LeggTilAdresse;
