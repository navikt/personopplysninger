import React from "react";
import { FormattedMessage } from "react-intl";
import { FormattedHTMLMessage } from "react-intl";
import UtenlandskAdresse from "./midlertidig-adresse/visning/UtenlandskAdresse";
import NorskMidlertidigAdresse from "./midlertidig-adresse/visning/NorskAdresse";
import { Adresser } from "types/adresser";
import Box from "components/box/Box";
import adresseIkon from "assets/img/Adresse.svg";
import Kilde from "components/kilde/Kilde";
import Environment from "Environments";
import endreIkon from "assets/img/Pencil.svg";
import leggTilIkon from "assets/img/LeggTil.svg";
import Folkeregisteret from "./folkeregisteret/Folkeregisteret";
import { Normaltekst, Undertittel } from "nav-frontend-typografi";

const { tjenesteUrl } = Environment();

interface Props {
  adresser: Adresser;
}

const AdresserOLD = (props: Props) => {
  const { adresser } = props;
  return (
    <Box
      id="adresser"
      tittel="adresse.tittel"
      beskrivelse="adresse.beskrivelse"
      icon={adresseIkon}
    >
      <Folkeregisteret adresser={adresser} />
      <div className="adresse__box">
        <div className="underseksjon__header underseksjon__divider">
          <Undertittel>
            <FormattedMessage id={"adresse.midlertidigadresse"} />
          </Undertittel>
        </div>
        {adresser.tilleggsadresse && (
          <NorskMidlertidigAdresse tilleggsadresse={adresser.tilleggsadresse} />
        )}
        {adresser.utenlandskAdresse && (
          <UtenlandskAdresse utenlandskadresse={adresser.utenlandskAdresse} />
        )}
        {!adresser.tilleggsadresse && !adresser.utenlandskAdresse && (
          <Normaltekst>
            <FormattedHTMLMessage id="adresse.midlertidigadresse.leggtil.beskrivelse" />
          </Normaltekst>
        )}
        {adresser.tilleggsadresse || adresser.utenlandskAdresse ? (
          <Kilde
            kilde="personalia.source.nav"
            lenke={`${tjenesteUrl}/brukerprofil/`}
            lenkeTekst="personalia.link.brukerprofil.endre"
            lenkeType={"EKSTERN"}
            ikon={endreIkon}
          />
        ) : (
          <Kilde
            kilde="personalia.source.nav"
            lenke={`${tjenesteUrl}/brukerprofil/`}
            lenkeTekst="personalia.link.brukerprofil.leggtil"
            lenkeType={"EKSTERN"}
            ikon={leggTilIkon}
          />
        )}
      </div>
    </Box>
  );
};

export default AdresserOLD;
