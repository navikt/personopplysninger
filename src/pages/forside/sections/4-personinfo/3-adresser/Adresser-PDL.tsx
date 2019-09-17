import React, { useEffect, useState } from "react";
import {
  FormattedHTMLMessage,
  InjectedIntlProps,
  injectIntl
} from "react-intl";
import { Adresser } from "../../../../../types/adresser";
import Box from "../../../../../components/box/Box";
import adresseIkon from "../../../../../assets/img/Adresse.svg";
import Kilde from "../../../../../components/kilde/Kilde";
import endreIkon from "../../../../../assets/img/Pencil.svg";
import leggTilIkon from "../../../../../assets/img/LeggTil.svg";
import AdressePanel from "./komponenter/AdressePanel";
import Folkeregisteret from "./folkeregisteret/Folkeregisteret";
import { Normaltekst } from "nav-frontend-typografi";
import { RadioPanelGruppe } from "nav-frontend-skjema";
import OpprettEllerEndreNorskMidlertidigAdresse from "./midlertidig-adresse/endring/NorskAdresse";
import OpprettEllerEndreUtenlandskAdresse from "./midlertidig-adresse/endring/UtenlandskAdresse";
import MidlertidigNorskAdresse from "./midlertidig-adresse/visning/NorskAdresse";
import UtenlandskAdresse from "./midlertidig-adresse/visning/UtenlandskAdresse";

interface Props {
  adresser: Adresser;
}

const AdresserPDL = (props: Props & InjectedIntlProps) => {
  const [opprettEllerEndre, settOpprettEllerEndre] = useState();
  const [norskEllerUtenlandsk, settNorskEllerUtenlandsk] = useState();
  const [utenlandskAdresse, settUtenlandskAdresse] = useState();
  const [tilleggsadresse, settTilleggsadresse] = useState();

  useEffect(() => {
    settTilleggsadresse(props.adresser.tilleggsadresse);
    settUtenlandskAdresse(props.adresser.utenlandskAdresse);
    settNorskEllerUtenlandsk(
      props.adresser.tilleggsadresse
        ? "NORSK"
        : props.adresser.utenlandskAdresse
        ? "UTENLANDSK"
        : undefined
    );
  }, [props.adresser.tilleggsadresse, props.adresser.utenlandskAdresse]);

  const harMidlertidigAdr = tilleggsadresse || utenlandskAdresse;

  const radioButtons = [
    {
      label: "Norsk adresse",
      value: "NORSK"
    },
    {
      label: "Utenlandsk adresse",
      value: "UTENLANDSK"
    }
  ];

  return (
    <Box
      id="adresser"
      tittel="adresse.tittel"
      beskrivelse="adresse.beskrivelse"
      icon={adresseIkon}
    >
      <hr className="box__linje-bred" />
      <Folkeregisteret adresser={props.adresser} />
      <AdressePanel tittel="adresse.midlertidigadresse">
        <div className="underseksjon__divider">
          {opprettEllerEndre ? (
            <>
              <div className="utbetalinger__type">
                <RadioPanelGruppe
                  name="type"
                  legend=""
                  radios={radioButtons}
                  checked={norskEllerUtenlandsk}
                  onChange={(e, value) => settNorskEllerUtenlandsk(value)}
                />
              </div>
              {norskEllerUtenlandsk === "NORSK" && (
                <OpprettEllerEndreNorskMidlertidigAdresse
                  tilleggsadresse={tilleggsadresse}
                  onChangeSuccess={adresse => settOpprettEllerEndre(false)}
                />
              )}
              {norskEllerUtenlandsk === "UTENLANDSK" && (
                <OpprettEllerEndreUtenlandskAdresse
                  onChangeSuccess={adresse => settOpprettEllerEndre(false)}
                  utenlandskadresse={utenlandskAdresse}
                />
              )}
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
        </div>
      </AdressePanel>
    </Box>
  );
};

export default injectIntl(AdresserPDL);
