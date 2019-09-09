import React, { useEffect, useState } from "react";
import { Undertittel } from "nav-frontend-typografi";
import { FormattedMessage } from "react-intl";
import { Tlfnr } from "../../../../../../types/personalia";
import leggTilIkon from "../../../../../../assets/img/LeggTil.svg";
import Kilde from "../../../../../../components/kilde/Kilde";
import Melding from "../../../../../../components/melding/Melding";
import EndreNummer from "./telefonnummer/EndreNummer";
import OpprettNummer from "./telefonnummer/OpprettNummer";

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
  const tempLandkode = "+47";

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
            titleId="personalia.tlfnr.mobil"
            currentLandskode={tempLandkode}
            currentTlfnummer={tlfnr.mobil}
            onDeleteSuccess={onDeleteSuccess}
            onChangeSuccess={onChangeSuccess}
          />
          <EndreNummer
            type={"HJEM"}
            titleId="personalia.tlfnr.hjem"
            currentLandskode={tempLandkode}
            currentTlfnummer={tlfnr.privat}
            onDeleteSuccess={onDeleteSuccess}
            onChangeSuccess={onChangeSuccess}
          />
          <EndreNummer
            type={"ARBEID"}
            titleId="personalia.tlfnr.arbeid"
            currentLandskode={tempLandkode}
            currentTlfnummer={tlfnr.jobb}
            onDeleteSuccess={onDeleteSuccess}
            onChangeSuccess={onChangeSuccess}
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
