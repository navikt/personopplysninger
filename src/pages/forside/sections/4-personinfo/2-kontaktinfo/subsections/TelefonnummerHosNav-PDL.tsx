import React, { useState } from "react";
import { Undertittel } from "nav-frontend-typografi";
import { FormattedMessage } from "react-intl";
import { Tlfnr } from "../../../../../../types/personalia";
import leggTilIkon from "../../../../../../assets/img/LeggTil.svg";
import Kilde from "../../../../../../components/kilde/Kilde";
import Melding from "../../../../../../components/melding/Melding";
import EndreNummer from "./telefonnummer/EndreNummer";
import OpprettNummer from "./telefonnummer/OpprettNummer";
import { fjernMellorom } from "../../../../../../utils/formattering";

interface Props {
  tlfnr?: Tlfnr;
}

const PDLTelefonnummerHosNav = (props: Props) => {
  const [opprett, settOpprett] = useState();
  const { tlfnr } = props;

  const onChangeSuccess = () => {
    settOpprett(false);
  };

  const onDeleteSuccess = () => {
    settOpprett(false);
  };

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
              landskode={tlfnr.landkodeMobil}
              tlfnummer={fjernMellorom(tlfnr.mobil)}
              onDeleteSuccess={onDeleteSuccess}
              onChangeSuccess={onChangeSuccess}
            />
          )}
          {tlfnr.privat && (
            <EndreNummer
              type={"HJEM"}
              titleId="personalia.tlfnr.hjem"
              landskode={tlfnr.landkodePrivat}
              tlfnummer={fjernMellorom(tlfnr.privat)}
              onDeleteSuccess={onDeleteSuccess}
              onChangeSuccess={onChangeSuccess}
            />
          )}
          {tlfnr.jobb && (
            <EndreNummer
              type={"ARBEID"}
              titleId="personalia.tlfnr.arbeid"
              landskode={tlfnr.landkodeJobb}
              tlfnummer={fjernMellorom(tlfnr.jobb)}
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
          onChangeSuccess={onChangeSuccess}
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
          lenkeTekst={"side.leggtil"}
          lenkeType={"KNAPP"}
          ikon={leggTilIkon}
        />
      )}
    </>
  );
};

export default PDLTelefonnummerHosNav;
