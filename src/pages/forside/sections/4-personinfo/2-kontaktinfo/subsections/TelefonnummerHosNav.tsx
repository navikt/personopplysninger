import React, { useState } from "react";
import { Normaltekst, Undertittel } from "nav-frontend-typografi";
import { FormattedMessage } from "react-intl";
import { Tlfnr } from "types/personalia";
import leggTilIkon from "assets/img/LeggTil.svg";
import Kilde from "components/kilde/Kilde";
import EndreNummer from "./telefonnummer/EndreNummer";
import OpprettNummer from "./telefonnummer/OpprettNummer";
import { fjernMellorom } from "utils/formattering";
import driftsmeldinger from "driftsmeldinger";
import { AlertStripeAdvarsel } from "nav-frontend-alertstriper";

interface Props {
  tlfnr?: Tlfnr;
}

const TelefonnummerHosNav = (props: Props) => {
  const [opprett, settOpprett] = useState<boolean>();
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
      <div style={{ paddingBottom: "1rem" }}>
        <AlertStripeAdvarsel>
          Endring og sletting av telefonnummer kan gå litt tregere enn vanlig.
          Endringene går igjennom, men det kan ta litt tid før de blir synlige
          på denne siden.
        </AlertStripeAdvarsel>
      </div>
      <div className="underseksjon__header">
        <Undertittel>
          <FormattedMessage id="personalia.tlfnr.oveskrift" />
        </Undertittel>
      </div>
      {tlfnr && (tlfnr.telefonHoved || tlfnr.telefonAlternativ) ? (
        <div>
          {tlfnr.telefonHoved && (
            <EndreNummer
              prioritet={1}
              titleId="personalia.tlfnr.telefon"
              hasTwoNumbers={!!(tlfnr.telefonHoved && tlfnr.telefonAlternativ)}
              landskode={tlfnr.landskodeHoved}
              tlfnummer={fjernMellorom(tlfnr.telefonHoved)}
              onDeleteSuccess={onDeleteSuccess}
              onChangeSuccess={onChangeSuccess}
            />
          )}
          {tlfnr.telefonAlternativ && (
            <EndreNummer
              prioritet={2}
              titleId="personalia.tlfnr.telefon"
              hasTwoNumbers={!!(tlfnr.telefonHoved && tlfnr.telefonAlternativ)}
              landskode={tlfnr.landskodeAlternativ}
              tlfnummer={fjernMellorom(tlfnr.telefonAlternativ)}
              onDeleteSuccess={onDeleteSuccess}
              onChangeSuccess={onChangeSuccess}
            />
          )}
        </div>
      ) : (
        <div className="underseksjon__beskrivelse">
          <FormattedMessage
            id="personalia.tlfnr.ingenData"
            values={{
              br: (text: String) => (
                <>
                  <br />
                  {text}
                </>
              ),
            }}
          />
        </div>
      )}

      {!opprett && !(tlfnr && tlfnr.telefonHoved && tlfnr.telefonAlternativ) && (
        <button onClick={onLeggTil} className="tlfnummer__leggtil lenke">
          <span className="kilde__icon">
            <img src={leggTilIkon} alt="Ekstern lenke" />
          </span>
          <Normaltekst>
            <FormattedMessage id={"side.leggtil"} />
          </Normaltekst>
        </button>
      )}

      {opprett && (
        <OpprettNummer
          prioritet={tlfnr && tlfnr.telefonHoved ? 2 : 1}
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
