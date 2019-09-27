import React, { useState } from "react";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { FormattedHTMLMessage } from "react-intl";
import { Adresser } from "types/adresser";
import Box from "components/box/Box";
import adresseIkon from "assets/img/Adresse.svg";
import Kilde from "components/kilde/Kilde";
import endreIkon from "assets/img/Pencil.svg";
import leggTilIkon from "assets/img/LeggTil.svg";
import AdressePanel from "./komponenter/AdressePanel";
import Folkeregisteret from "./folkeregisteret/Folkeregisteret";
import { Normaltekst } from "nav-frontend-typografi";
import { Radio } from "nav-frontend-skjema";
import OpprettEllerEndreNorskMidlertidigAdresse from "./midlertidig-adresse/endring/NorskAdresse";
import OpprettEllerEndreUtenlandskAdresse from "./midlertidig-adresse/endring/UtenlandskAdresse";
import MidlertidigNorskAdresse from "./midlertidig-adresse/visning/NorskAdresse";
import UtenlandskAdresse from "./midlertidig-adresse/visning/UtenlandskAdresse";

interface Props {
  adresser: Adresser;
}

const NORSK = "NORSK";
const UTENLANDSK = "UTENLANDSK";

const AdresserPDL = (props: Props & InjectedIntlProps) => {
  const { intl, adresser } = props;
  const { tilleggsadresse, utenlandskAdresse } = adresser;
  const harMidlertidigAdr = tilleggsadresse || utenlandskAdresse;
  const [opprettEllerEndre, settOpprettEllerEndre] = useState();
  const [norskEllerUtenlandsk, settNorskEllerUtenlandsk] = useState(
    props.adresser.tilleggsadresse
      ? "NORSK"
      : props.adresser.utenlandskAdresse
      ? "UTENLANDSK"
      : undefined
  );

  return (
    <Box
      id="adresser"
      tittel="adresse.tittel"
      beskrivelse="adresse.beskrivelse"
      icon={adresseIkon}
    >
      <Folkeregisteret adresser={props.adresser} />
      <hr className="box__linje-bred" />
      <AdressePanel tittel="adresse.midlertidigadresse">
        {opprettEllerEndre ? (
          <div className="adresse__form">
            <Radio
              name={NORSK}
              checked={norskEllerUtenlandsk === NORSK}
              label={intl.messages["felter.adressevalg.norsk"]}
              onChange={e => settNorskEllerUtenlandsk(e.target.name)}
            />
            <Radio
              name={UTENLANDSK}
              checked={norskEllerUtenlandsk === UTENLANDSK}
              label={intl.messages["felter.adressevalg.utenlandsk"]}
              onChange={e => settNorskEllerUtenlandsk(e.target.name)}
            />
            {norskEllerUtenlandsk === "NORSK" && (
              <OpprettEllerEndreNorskMidlertidigAdresse
                tilleggsadresse={props.adresser.tilleggsadresse}
                settOpprettEllerEndre={settOpprettEllerEndre}
              />
            )}
            {norskEllerUtenlandsk === "UTENLANDSK" && (
              <OpprettEllerEndreUtenlandskAdresse
                utenlandskadresse={props.adresser.utenlandskAdresse}
                settOpprettEllerEndre={settOpprettEllerEndre}
              />
            )}
            <Kilde kilde="personalia.source.nav" lenkeType={"INGEN"} />
          </div>
        ) : (
          <>
            {tilleggsadresse && (
              <MidlertidigNorskAdresse tilleggsadresse={tilleggsadresse} />
            )}
            {utenlandskAdresse && (
              <UtenlandskAdresse utenlandskadresse={utenlandskAdresse} />
            )}
            {!tilleggsadresse && !utenlandskAdresse && (
              <Normaltekst>
                <FormattedHTMLMessage id="adresse.midlertidigadresse.leggtil.beskrivelse" />
              </Normaltekst>
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
      </AdressePanel>
    </Box>
  );
};

export default injectIntl(AdresserPDL);
