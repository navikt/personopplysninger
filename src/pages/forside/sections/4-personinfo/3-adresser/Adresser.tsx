import React from "react";
import PropTypes from "prop-types";
import {
  FormattedHTMLMessage,
  InjectedIntlProps,
  injectIntl
} from "react-intl";
import UtenlandskAdresse from "./midlertidig-adresse/visning/UtenlandskAdresse";
import MidlertidigAdresse from "./midlertidig-adresse/visning/MidlertidigAdresse";
import { Adresser } from "../../../../../types/adresser";
import Box from "../../../../../components/box/Box";
import adresseIkon from "../../../../../assets/img/Adresse.svg";
import Kilde from "../../../../../components/kilde/Kilde";
import Environment from "../../../../../utils/Environments";
import endreIkon from "../../../../../assets/img/Pencil.svg";
import leggTilIkon from "../../../../../assets/img/LeggTil.svg";
import AdressePanel from "../../../../../components/adresse/AdressePanel";
import Folkeregisteret from "./folkeregisteret/Folkeregisteret";
import { Normaltekst } from "nav-frontend-typografi";

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
      <AdressePanel tittel="adresse.midlertidigadresse">
        <div className="underseksjon__divider">
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
          </>
        </div>
      </AdressePanel>
    </Box>
  );
};

AdresseContainer.propTypes = {
  adresser: PropTypes.shape({}).isRequired
};

export default injectIntl(AdresseContainer);
