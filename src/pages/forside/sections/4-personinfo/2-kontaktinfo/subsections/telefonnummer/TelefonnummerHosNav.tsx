import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import { Tlfnr } from "types/personalia";
import leggTilIkon from "assets/img/LeggTil.svg";
import Kilde from "components/kilde/Kilde";
import Telefonnummer from "./Telefonnummer";
import TelefonnummerForm from "./TelefonnummerForm";
import { fjernMellorom } from "utils/formattering";
import driftsmeldinger from "driftsmeldinger";
import { Alert, BodyShort, Button, Heading } from "@navikt/ds-react";

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
          <Alert variant="warning">{driftsmeldinger.pdl}</Alert>
        </div>
      )}
      <div className="underseksjon__header">
        <Heading size={"small"} level={"3"}>
          <FormattedMessage id="personalia.tlfnr.oveskrift" />
        </Heading>
      </div>
      {tlfnr && (tlfnr.telefonHoved || tlfnr.telefonAlternativ) ? (
        <div>
          {tlfnr.telefonHoved && (
            <Telefonnummer
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
            <Telefonnummer
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
        <Button
          variant="tertiary"
          onClick={onLeggTil}
          className="tlfnummer__leggtil knapp-med-ikon lenke"
          aria-label="Legg til telefonnummer"
        >
          <span className="kilde__icon">
            <img src={leggTilIkon} alt="" />
          </span>
          <BodyShort>
            <FormattedMessage id={"side.leggtil"} />
          </BodyShort>
        </Button>
      )}

      {opprett && (
        <TelefonnummerForm
          type={"opprett"}
          prioritet={tlfnr && tlfnr.telefonHoved ? 2 : 1}
          onCancelClick={() => settOpprett(false)}
          onChangeSuccess={onChangeSuccess}
          tlfnr={tlfnr}
          defaultValues={{
            landskode: {
              label: "Norge",
              value: "+47",
            },
            tlfnummer: "",
          }}
        />
      )}

      <Kilde kilde="personalia.source.nav" lenkeType={"INGEN"} />
    </>
  );
};

export default TelefonnummerHosNav;
