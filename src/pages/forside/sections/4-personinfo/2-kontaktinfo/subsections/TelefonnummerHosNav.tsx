import React, { useState } from "react";
import { Undertittel } from "nav-frontend-typografi";
import { FormattedMessage } from "react-intl";
import { Tlfnr } from "../../../../../../types/personalia";
import Kilde from "../../../../../../components/kilde/Kilde";
import Environment from "../../../../../../utils/Environments";
import leggTilIkon from "../../../../../../assets/img/LeggTil.svg";
import { useStore } from "../../../../../../providers/Provider";
import Melding from "../../../../../../components/melding/Melding";
import Telefonnummer from "../../../../../../components/telefonnummer/Telefonnummer";

const { tjenesteUrl } = Environment();

interface Props {
  tlfnr?: Tlfnr;
}

const TelefonnummerHosNav = (props: Props) => {
  const [{ featureToggles }] = useStore();
  const [leggTil, settLeggTil] = useState();
  const { tlfnr } = props;
  return (
    <>
      <div className="underseksjon__header">
        <Undertittel>
          <FormattedMessage id="personalia.tlfnr.oveskrift" />
        </Undertittel>
      </div>
      {tlfnr ? (
        <>
          <Telefonnummer
            type={"ARBEID"}
            titleId="personalia.tlfnr.arbeid"
            value={tlfnr.jobb}
          />
          <Telefonnummer
            type={"MOBIL"}
            titleId="personalia.tlfnr.mobil"
            value={tlfnr.mobil}
          />
          <Telefonnummer
            type={"HJEM"}
            titleId="personalia.tlfnr.hjem"
            value={tlfnr.privat}
          />
        </>
      ) : (
        <Melding meldingId="personalia.tlfnr.ingenData" />
      )}

      {featureToggles.data["personopplysninger.pdl"] ? (
        tlfnr && tlfnr.jobb && tlfnr.mobil && tlfnr.privat ? (
          <Kilde kilde="personalia.source.nav" lenkeType={"INGEN"} />
        ) : (
          <Kilde
            kilde="personalia.source.nav"
            onClick={() => settLeggTil(!leggTil)}
            lenkeTekst="side.leggtil"
            lenkeType={"KNAPP"}
            ikon={leggTilIkon}
          />
        )
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
  );
};

export default TelefonnummerHosNav;
