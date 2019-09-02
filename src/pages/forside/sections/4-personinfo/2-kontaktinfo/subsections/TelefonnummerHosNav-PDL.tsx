import React, { useState } from "react";
import { Undertittel } from "nav-frontend-typografi";
import { FormattedMessage } from "react-intl";
import { Tlfnr } from "../../../../../../types/personalia";
import leggTilIkon from "../../../../../../assets/img/LeggTil.svg";
import Kilde from "../../../../../../components/kilde/Kilde";
import Melding from "../../../../../../components/melding/Melding";
import EndreNummer from "../../../../../../components/telefonnummer/EndreNummer";
import OpprettNummer from "../../../../../../components/telefonnummer/OpprettNummer";

interface Props {
  tlfnr?: Tlfnr;
}

const PDLTelefonnummerHosNav = (props: Props) => {
  const [opprett, settOpprett] = useState();
  const [tlfnr, settTlfnr] = useState(props.tlfnr);

  const mapTypes = {
    HJEM: "privat",
    MOBIL: "mobil",
    ARBEID: "arbeid"
  } as { [key: string]: string };

  const onSuccess = (type: string, tlfnummer: string) => {
    settTlfnr({ ...tlfnr, [mapTypes[type]]: tlfnummer });
  };

  return (
    <>
      <div className="underseksjon__header">
        <Undertittel>
          <FormattedMessage id="personalia.tlfnr.oveskrift" />
        </Undertittel>
      </div>
      {tlfnr ? (
        <div>
          <EndreNummer
            type={"MOBIL"}
            onSuccess={onSuccess}
            titleId="personalia.tlfnr.mobil"
            value={tlfnr.mobil}
          />
          <EndreNummer
            type={"HJEM"}
            onSuccess={onSuccess}
            titleId="personalia.tlfnr.hjem"
            value={tlfnr.privat}
          />
          <EndreNummer
            type={"ARBEID"}
            onSuccess={onSuccess}
            titleId="personalia.tlfnr.arbeid"
            value={tlfnr.jobb}
          />
        </div>
      ) : (
        <Melding meldingId="personalia.tlfnr.ingenData" />
      )}

      {opprett ? (
        <OpprettNummer
          onSuccess={onSuccess}
          onCancelClick={() => settOpprett(false)}
          tlfnr={tlfnr}
        />
      ) : (
        <div className="tlfnummer__divider-hidden" />
      )}

      {opprett || (tlfnr && tlfnr.jobb && tlfnr.mobil && tlfnr.privat) ? (
        <Kilde kilde="personalia.source.nav" lenkeType={"INGEN"} />
      ) : (
        <Kilde
          kilde="personalia.source.nav"
          onClick={() => settOpprett(!opprett)}
          lenkeTekst={opprett ? "side.avbryt" : "side.leggtil"}
          lenkeType={"KNAPP"}
          ikon={!opprett ? leggTilIkon : undefined}
        />
      )}
    </>
  );
};

export default PDLTelefonnummerHosNav;
