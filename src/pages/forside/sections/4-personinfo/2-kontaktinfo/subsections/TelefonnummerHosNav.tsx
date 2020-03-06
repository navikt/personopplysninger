import React, { useState } from "react";
import { Normaltekst, Undertittel } from "nav-frontend-typografi";
import { FormattedHTMLMessage } from "react-intl";
import { Tlfnr } from "types/personalia";
import leggTilIkon from "assets/img/LeggTil.svg";
import Kilde from "components/kilde/Kilde";
import Melding from "components/melding/Melding";
import EndreNummer from "./telefonnummer/EndreNummer";
import OpprettNummer from "./telefonnummer/OpprettNummer";
import { fjernMellorom } from "utils/formattering";
import driftsmeldinger from "driftsmeldinger";
import { AlertStripeAdvarsel } from "nav-frontend-alertstriper";

interface Props {
  tlfnr?: Tlfnr;
}

const TelefonnummerHosNav = (props: Props) => {
  const [opprett, settOpprett] = useState();
  const { tlfnr } = props;

  const onChangeSuccess = () => {
    settOpprett(false);
  };

  const onDeleteSuccess = () => {
    settOpprett(false);
  };

  const onLeggTil = () => settOpprett(!opprett);

  return (
    <>
      {driftsmeldinger.pdl && (
        <div style={{ paddingBottom: "1rem" }}>
          <AlertStripeAdvarsel>{driftsmeldinger.pdl}</AlertStripeAdvarsel>
        </div>
      )}
      <div className="underseksjon__header">
        <Undertittel>
          <FormattedHTMLMessage id="personalia.tlfnr.oveskrift" />
        </Undertittel>
      </div>
      {tlfnr && (tlfnr.telefonHoved || tlfnr.telefonAlternativ) ? (
        <div>
          {tlfnr.telefonHoved && (
            <EndreNummer
              prioritet={1}
              titleId="personalia.tlfnr.hoved"
              landskode={tlfnr.landskodeHoved}
              tlfnummer={fjernMellorom(tlfnr.telefonHoved)}
              onDeleteSuccess={onDeleteSuccess}
              onChangeSuccess={onChangeSuccess}
            />
          )}
          {tlfnr.telefonAlternativ && (
            <EndreNummer
              prioritet={2}
              titleId="personalia.tlfnr.alternativ"
              landskode={tlfnr.landskodeAlternativ}
              tlfnummer={fjernMellorom(tlfnr.telefonAlternativ)}
              onDeleteSuccess={onDeleteSuccess}
              onChangeSuccess={onChangeSuccess}
            />
          )}
        </div>
      ) : (
        <Melding meldingId="personalia.tlfnr.ingenData" />
      )}

      {!opprett && !(tlfnr && tlfnr.telefonHoved && tlfnr.telefonAlternativ) && (
        <button onClick={onLeggTil} className="tlfnummer__leggtil lenke">
          <span className="kilde__icon">
            <img src={leggTilIkon} alt="Ekstern lenke" />
          </span>
          <Normaltekst>
            <FormattedHTMLMessage id={"side.leggtil"} />
          </Normaltekst>
        </button>
      )}

      {opprett && (
        <OpprettNummer
          onCancelClick={() => settOpprett(false)}
          onChangeSuccess={onChangeSuccess}
          tlfnr={tlfnr}
        />
      )}

      <Kilde kilde="personalia.source.nav" lenkeType={"INGEN"} />
    </>
  );
};

export default TelefonnummerHosNav;
