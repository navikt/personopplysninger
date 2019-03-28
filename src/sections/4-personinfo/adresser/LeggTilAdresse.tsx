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
        kilde="personalia.source.nav"
        lenke={`${tjenesteUrl}/brukerprofil/`}
        lenkeTekst="personalia.link.brukerprofil.leggtil"
      />
    </>
  </AdressePanel>
);

export default LeggTilAdresse;
