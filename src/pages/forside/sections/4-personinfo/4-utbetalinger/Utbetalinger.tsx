import React, { useState } from "react";
import Box from "components/box/Box";
import kontonummerIkon from "assets/img/Kontonummer.svg";
import { UtenlandskBankkonto } from "types/personalia";
import Kilde from "components/kilde/Kilde";
import endreIkon from "assets/img/Pencil.svg";
import leggTilIkon from "assets/img/Pencil.svg";
import NorskKontonummer from "./visning/NorskKontonummer";
import Utenlandskonto from "./visning/UtenlandsBankkonto";
import { FormattedMessage } from "react-intl";
import { Alert } from "@navikt/ds-react";
import driftsmeldinger from "driftsmeldinger";
import KontonummerForm from "./endring/KontonummerForm";
import { useIntlFormatter } from "../../../../../hooks/useIntlFormatter";

interface Props {
  utenlandskbank?: UtenlandskBankkonto;
  personident?: { verdi: string; type: string };
  kontonr?: string;
  kontoregisterStatus: string;
}

const Utbetalinger = (props: Props) => {
  const { kontonr, utenlandskbank, personident, kontoregisterStatus } = props;
  const [opprettEllerEndre, settOpprettEllerEndre] = useState<boolean>(false);

  const { formatMessage } = useIntlFormatter();

  return (
    <Box
      id="utbetaling"
      tittel="utbetalinger.tittel"
      icon={kontonummerIkon}
      visAnkerlenke={true}
    >
      <>
        {driftsmeldinger.pdl && (
          <div style={{ paddingBottom: "1rem" }}>
            <Alert variant="warning">{driftsmeldinger.pdl}</Alert>
          </div>
        )}
      </>
      {kontoregisterStatus === "ERROR" ? (
        <Alert variant="error">
          {formatMessage("personalia.kontonr.feilmelding")}
        </Alert>
      ) : opprettEllerEndre ? (
        <KontonummerForm
          utenlandskbank={utenlandskbank}
          personident={personident}
          kontonr={kontonr}
          settOpprettEllerEndre={settOpprettEllerEndre}
        />
      ) : (
        <>
          {kontonr || utenlandskbank ? (
            <>
              <NorskKontonummer kontonummer={kontonr} />
              <Utenlandskonto utenlandskBankkonto={utenlandskbank} />
            </>
          ) : (
            <div className="underseksjon__beskrivelse">
              <FormattedMessage
                id="personalia.kontonr.ingenData"
                values={{
                  br: (text) => (
                    <>
                      <br />
                      {text}
                    </>
                  ),
                }}
              />
            </div>
          )}
          <Kilde
            kilde="personalia.source.nav"
            onClick={() => settOpprettEllerEndre(true)}
            lenkeTekst={
              kontonr || utenlandskbank ? "side.endre" : "side.leggtil"
            }
            lenkeType={"KNAPP"}
            ikon={kontonr || utenlandskbank ? endreIkon : leggTilIkon}
          />
        </>
      )}
    </Box>
  );
};

export default Utbetalinger;
