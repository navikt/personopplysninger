import React, { useEffect, useState } from "react";
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

const mapTypes = {
  HJEM: "privat",
  MOBIL: "mobil",
  ARBEID: "jobb"
} as { [key: string]: string };

const PDLTelefonnummerHosNav = (props: Props) => {
  const [opprett, settOpprett] = useState();
  const [tlfnr, settTlfnr] = useState();

  const onChangeSuccess = (type: string, tlfnummer: string) => {
    settTlfnr({ ...tlfnr, [mapTypes[type]]: tlfnummer });
  };

  const onDeleteSuccess = (type: string) => {
    const rest = Object.assign({}, tlfnr);
    delete rest[mapTypes[type]];
    settTlfnr(rest);
  };

  useEffect(() => {
    settTlfnr(props.tlfnr);
  }, [props.tlfnr]);

  return (
    <>
      <div className="underseksjon__header">
        <Undertittel>
          <FormattedMessage id="personalia.tlfnr.oveskrift" />
        </Undertittel>
      </div>
      {tlfnr && (tlfnr.mobil || tlfnr.privat || tlfnr.jobb) ? (
        <div>
          <EndreNummer
            type={"MOBIL"}
            onDeleteSuccess={onDeleteSuccess}
            onChangeSuccess={onChangeSuccess}
            titleId="personalia.tlfnr.mobil"
            value={tlfnr.mobil}
          />
          <EndreNummer
            type={"HJEM"}
            onDeleteSuccess={onDeleteSuccess}
            onChangeSuccess={onChangeSuccess}
            titleId="personalia.tlfnr.hjem"
            value={tlfnr.privat}
          />
          <EndreNummer
            type={"ARBEID"}
            onDeleteSuccess={onDeleteSuccess}
            onChangeSuccess={onChangeSuccess}
            titleId="personalia.tlfnr.arbeid"
            value={tlfnr.jobb}
          />
        </div>
      ) : (
        <Melding meldingId="personalia.tlfnr.ingenData" />
      )}

      {opprett ? (
        <OpprettNummer
          onCancelClick={() => settOpprett(false)}
          onChangeSuccess={(type, tlfnummer) => {
            onChangeSuccess(type, tlfnummer);
            settOpprett(false);
          }}
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
