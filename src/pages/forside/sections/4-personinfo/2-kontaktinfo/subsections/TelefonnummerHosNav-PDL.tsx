import React, { useState } from "react";
import { Undertittel } from "nav-frontend-typografi";
import { FormattedMessage } from "react-intl";
import { Tlfnr } from "../../../../../../types/personalia";
import leggTilIkon from "../../../../../../assets/img/LeggTil.svg";
import Kilde from "../../../../../../components/kilde/Kilde";
import Melding from "../../../../../../components/melding/Melding";
import Telefonnummer from "../../../../../../components/telefonnummer/Telefonnummer";

interface Props {
  tlfnr?: Tlfnr;
}

const PDLTelefonnummerHosNav = (props: Props) => {
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
            type={"MOBIL"}
            titleId="personalia.tlfnr.mobil"
            value={tlfnr.mobil}
          />
          <Telefonnummer
            type={"HJEM"}
            titleId="personalia.tlfnr.hjem"
            value={tlfnr.privat}
          />
          <Telefonnummer
            type={"ARBEID"}
            titleId="personalia.tlfnr.arbeid"
            value={tlfnr.jobb}
          />
        </>
      ) : (
        <Melding meldingId="personalia.tlfnr.ingenData" />
      )}

      {tlfnr && tlfnr.jobb && tlfnr.mobil && tlfnr.privat ? (
        <Kilde kilde="personalia.source.nav" lenkeType={"INGEN"} />
      ) : (
        <Kilde
          kilde="personalia.source.nav"
          onClick={() => settLeggTil(!leggTil)}
          lenkeTekst="side.leggtil"
          lenkeType={"KNAPP"}
          ikon={leggTilIkon}
        />
      )}
    </>
  );
};

export default PDLTelefonnummerHosNav;
