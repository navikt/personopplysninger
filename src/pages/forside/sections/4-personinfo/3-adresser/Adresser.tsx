import React from "react";
import PropTypes from "prop-types";
import { InjectedIntlProps, injectIntl } from "react-intl";
import UtenlandskAdresse from "./visning/UtenlandskAdresse";
import MidlertidigAdresse from "./visning/MidlertidigAdresse";
import { Adresser } from "../../../../../types/adresser";
import Box from "../../../../../components/box/Box";
import adresseIkon from "../../../../../assets/img/Adresse.svg";
import LeggTilAdresse from "./LeggTilAdresse";
import Kilde from "../../../../../components/kilde/Kilde";
import Environment from "../../../../../utils/Environments";
import endreIkon from "../../../../../assets/img/Pencil.svg";
import leggTilIkon from "../../../../../assets/img/LeggTil.svg";
import AdressePanel from "../../../../../components/adresse/AdressePanel";
import Folkeregisteret from "./visning/Folkeregisteret";

const { tjenesteUrl } = Environment();
interface Props {
  adresser: Adresser;
}

const AdresseContainer = (props: Props & InjectedIntlProps) => {
  const { adresser } = props;
  return (
    <Box
      id="adresser"
      tittel="adresse.tittel"
      beskrivelse="adresse.beskrivelse"
      icon={adresseIkon}
    >
      <hr className="box__linje-bred" />
      <Folkeregisteret adresser={adresser} />
      <div className="underseksjon__divider">
        <AdressePanel tittel="adresse.midlertidigadresse">
          <>
            {adresser.tilleggsadresse && (
              <MidlertidigAdresse tilleggsadresse={adresser.tilleggsadresse} />
            )}
            {adresser.utenlandskAdresse && (
              <UtenlandskAdresse
                utenlandskadresse={adresser.utenlandskAdresse}
              />
            )}
            {!adresser.tilleggsadresse && !adresser.utenlandskAdresse && (
              <LeggTilAdresse />
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
          </>
        </AdressePanel>
      </div>
    </Box>
  );
};

AdresseContainer.propTypes = {
  adresser: PropTypes.shape({}).isRequired
};

export default injectIntl(AdresseContainer);
