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
import endreIkon from "../../../../../assets/img/Pencil.svg";
import eksternLenkeIkon from "../../../../../assets/img/Link.svg";
import leggTilIkon from "../../../../../assets/img/LeggTil.svg";

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
      <div>
        {adresser.boadresse && <BoAdresse boadresse={adresser.boadresse} />}
        {adresser.boadresse && adresser.postadresse && (
          <div className="addresse__divider" />
        )}
        {adresser.postadresse && (
          <PostAdresse postadresse={adresser.postadresse} />
        )}
        {(adresser.boadresse || adresser.postadresse) && (
          <Kilde
            kilde="personalia.source.folkeregisteret"
            lenke="https://www.skatteetaten.no/person/folkeregister/"
            lenkeTekst="personalia.link.folkeregisteret"
            lenkeType={"EKSTERN"}
            ikon={eksternLenkeIkon}
          />
        )}
      </div>
      <div className="underseksjon__divider">
        {adresser.tilleggsadresse && (
          <MidlertidigAdresse tilleggsadresse={adresser.tilleggsadresse} />
        )}
        {adresser.utenlandskAdresse && (
          <UtenlandskAdresse utenlandskadresse={adresser.utenlandskAdresse} />
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
      </div>
    </Box>
  );
};

AdresseContainer.propTypes = {
  adresser: PropTypes.shape({}).isRequired
};

export default injectIntl(AdresseContainer);
