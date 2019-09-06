import React, { useState } from "react";
import { InjectedIntlProps, injectIntl } from "react-intl";
import UtenlandskAdresse from "./visning/UtenlandskAdresse";
import MidlertidigAdresse from "./visning/MidlertidigAdresse";
import { Adresser } from "../../../../../types/adresser";
import Box from "../../../../../components/box/Box";
import adresseIkon from "../../../../../assets/img/Adresse.svg";
import LeggTilAdresse from "./LeggTilAdresse";
import Kilde from "../../../../../components/kilde/Kilde";
import endreIkon from "../../../../../assets/img/Pencil.svg";
import leggTilIkon from "../../../../../assets/img/LeggTil.svg";
import AdressePanel from "../../../../../components/adresse/AdressePanel";
import Folkeregisteret from "./visning/Folkeregisteret";

interface Props {
  adresser: Adresser;
}

const AdresserPDL = (props: Props & InjectedIntlProps) => {
  const [opprettEllerEndre, settOpprettEllerEndre] = useState();
  const { adresser } = props;

  const harMidlertidigAdr =
    adresser.tilleggsadresse || adresser.utenlandskAdresse;

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
          {opprettEllerEndre ? (
            <>
              <Kilde
                kilde="personalia.source.nav"
                onClick={() => settOpprettEllerEndre(false)}
                lenkeTekst="side.avbryt"
                lenkeType={"KNAPP"}
                ikon={endreIkon}
              />
            </>
          ) : (
            <>
              {adresser.tilleggsadresse && (
                <MidlertidigAdresse
                  tilleggsadresse={adresser.tilleggsadresse}
                />
              )}
              {adresser.utenlandskAdresse && (
                <UtenlandskAdresse
                  utenlandskadresse={adresser.utenlandskAdresse}
                />
              )}
              {!adresser.tilleggsadresse && !adresser.utenlandskAdresse && (
                <LeggTilAdresse />
              )}
              <Kilde
                kilde="personalia.source.nav"
                onClick={() => settOpprettEllerEndre(true)}
                ikon={harMidlertidigAdr ? endreIkon : leggTilIkon}
                lenkeTekst={harMidlertidigAdr ? "side.endre" : "side.leggtil"}
                lenkeType={"KNAPP"}
              />
            </>
          )}
        </div>
      </AdressePanel>
    </Box>
  );
};

export default injectIntl(AdresserPDL);
