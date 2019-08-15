import React from "react";
import PropTypes from "prop-types";
import { InjectedIntlProps, injectIntl } from "react-intl";
import BoAdresse from "./varianter/BoAdresse";
import PostAdresse from "./varianter/PostAdresse";
import UtenlandskAdresse from "./varianter/UtenlandskAdresse";
import MidlertidigAdresse from "./varianter/MidlertidigAdresse";
import { Adresser } from "../../../../../types/adresser";
import Box from "../../../../../components/box/Box";
import adresseIkon from "../../../../../assets/img/Adresse.svg";
import LeggTilAdresse from "./LeggTilAdresse";
import Kilde from "../../../../../components/kilde/Kilde";
import Environment from "../../../../../utils/Environments";

const { tjenesteUrl } = Environment();
interface Props {
  adresser: Adresser;
}

const AdresseContainer = (props: Props & InjectedIntlProps) => {
  const { adresser } = props;
  return (
    <Box
      id="adresse"
      tittel="adresse.tittel"
      beskrivelse="adresse.beskrivelse"
      icon={adresseIkon}
    >
      <hr className="box__linje-bred" />
      <div>
        {adresser.boadresse && <BoAdresse boadresse={adresser.boadresse} />}
        {adresser.postadresse && (
          <PostAdresse postadresse={adresser.postadresse} />
        )}
        <hr className="box__linje-bred" />
        <Kilde
          kilde="personalia.source.folkeregisteret"
          lenke="https://www.skatteetaten.no/person/folkeregister/"
          lenkeTekst="personalia.link.folkeregisteret"
        />
      </div>
      <div className="addresse__seksjon">
        {adresser.tilleggsadresse && (
          <MidlertidigAdresse tilleggsadresse={adresser.tilleggsadresse} />
        )}
        {adresser.utenlandskAdresse && (
          <UtenlandskAdresse utenlandskadresse={adresser.utenlandskAdresse} />
        )}
        {!adresser.tilleggsadresse && !adresser.utenlandskAdresse && (
          <LeggTilAdresse />
        )}
        <hr className="box__linje-bred" />
        <Kilde
          kilde="personalia.source.nav"
          lenke={`${tjenesteUrl}/brukerprofil/`}
          lenkeTekst="personalia.link.brukerprofil.endre"
        />
      </div>
    </Box>
  );
};

AdresseContainer.propTypes = {
  adresser: PropTypes.shape({}).isRequired
};

export default injectIntl(AdresseContainer);
