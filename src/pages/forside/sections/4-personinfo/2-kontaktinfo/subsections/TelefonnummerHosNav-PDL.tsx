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

  const onChangeSuccess = (
    type: string,
    tlfnummer: string,
    landskode: { value: string; label: string }
  ) => {
    settTlfnr({ ...tlfnr, [mapTypes[type]]: { nummer: tlfnummer, landskode } });
  };

  const onDeleteSuccess = (type: string) => {
    const rest = Object.assign({}, tlfnr);
    delete rest[mapTypes[type]];
    settTlfnr(rest);
  };

  useEffect(() => {
    const tempLandskode = {
      value: "+47",
      label: "Norge"
    };

    if (props.tlfnr) {
      settTlfnr({
        ...(props.tlfnr.mobil && {
          mobil: {
            landskode: tempLandskode,
            nummer: props.tlfnr.mobil
          }
        }),
        ...(props.tlfnr.privat && {
          privat: {
            landskode: tempLandskode,
            nummer: props.tlfnr.privat
          }
        }),
        ...(props.tlfnr.jobb && {
          jobb: {
            landskode: tempLandskode,
            nummer: props.tlfnr.jobb
          }
        })
      });
    }
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
          {tlfnr.mobil && (
            <EndreNummer
              type={"MOBIL"}
              titleId="personalia.tlfnr.mobil"
              currentLandskode={tlfnr.mobil.landskode}
              currentTlfnummer={tlfnr.mobil.nummer}
              onDeleteSuccess={onDeleteSuccess}
              onChangeSuccess={onChangeSuccess}
            />
          )}
          {tlfnr.privat && (
            <EndreNummer
              type={"HJEM"}
              titleId="personalia.tlfnr.hjem"
              currentLandskode={tlfnr.privat.landskode}
              currentTlfnummer={tlfnr.privat.nummer}
              onDeleteSuccess={onDeleteSuccess}
              onChangeSuccess={onChangeSuccess}
            />
          )}
          {tlfnr.jobb && (
            <EndreNummer
              type={"ARBEID"}
              titleId="personalia.tlfnr.arbeid"
              currentLandskode={tlfnr.jobb.landskode}
              currentTlfnummer={tlfnr.jobb.nummer}
              onDeleteSuccess={onDeleteSuccess}
              onChangeSuccess={onChangeSuccess}
            />
          )}
        </div>
      ) : (
        <Melding meldingId="personalia.tlfnr.ingenData" />
      )}

      {opprett ? (
        <OpprettNummer
          onCancelClick={() => settOpprett(false)}
          onChangeSuccess={(type, tlfnummer, landskode) => {
            onChangeSuccess(type, tlfnummer, landskode);
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
