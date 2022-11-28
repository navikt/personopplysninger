import React, { useState } from "react";
import Box from "components/box/Box";
import kontonummerIkon from "assets/img/Kontonummer.svg";
import { UtenlandskBankkonto } from "types/personalia";
import Kilde from "components/kilde/Kilde";
import endreIkon from "assets/img/Pencil.svg";
import leggTilIkon from "assets/img/Pencil.svg";
import NorskKontonummer from "./visning/NorskKontonummer";
import Utenlandskonto from "./visning/UtenlandsBankkonto";
import OpprettEllerEndreNorskKontonr, {
  OutboundNorskKontonummer,
  setOutboundNorskKontonummer,
} from "./endring/NorskKontonummer";
import OpprettEllerEndreUtenlandsbank, {
  OutboundUtenlandsbankonto,
  setOutboundUtenlandsbankonto,
} from "./endring/utenlandsk-bankkonto/UtenlandsBankkonto";
import { FormattedMessage, useIntl } from "react-intl";
import HttpFeilmelding, {
  Feilmelding,
} from "components/httpFeilmelding/HttpFeilmelding";
import { Form, FormContext, Validation } from "calidation";
import { fetchPersonInfo, postKontonummer } from "clients/apiClient";
import { Alert, Button, Radio, RadioGroup } from "@navikt/ds-react";
import { PersonInfo } from "types/personInfo";
import { useStore } from "store/Context";
import driftsmeldinger from "driftsmeldinger";
import { normalizeNummer } from "../../../../../utils/formattering";

interface Props {
  utenlandskbank?: UtenlandskBankkonto;
  personident?: { verdi: string; type: string };
  kontonr?: string;
}

const NORSK = "NORSK";
const UTENLANDSK = "UTENLANDSK";

const Utbetalinger = (props: Props) => {
  const { formatMessage: msg } = useIntl();
  const { kontonr, utenlandskbank, personident } = props;
  const [loading, settLoading] = useState<boolean>(false);
  const [opprettEllerEndre, settOpprettEllerEndre] = useState<boolean>(false);
  const [alert, settAlert] = useState<Feilmelding | null>(null);
  const [, dispatch] = useStore();

  const initialValues = {
    norskEllerUtenlandsk: kontonr
      ? NORSK
      : utenlandskbank
      ? UTENLANDSK
      : undefined,
  };

  const config = {
    norskEllerUtenlandsk: {
      isRequired: msg({ id: "felter.type.velg" }),
    },
  };

  const submitEndre = (context: FormContext) => {
    const { isValid, fields } = context;
    if (isValid) {
      type Outbound = OutboundNorskKontonummer | OutboundUtenlandsbankonto;
      const outbound: { [key: string]: () => Outbound } = {
        NORSK: () => {
          fields.kontonummer = normalizeNummer(fields.kontonummer);
          return setOutboundNorskKontonummer(context);
        },
        UTENLANDSK: () => setOutboundUtenlandsbankonto(context),
      };

      settLoading(true);
      postKontonummer(outbound[fields.norskEllerUtenlandsk]())
        .then(getUpdatedData)
        .then(onSuccess)
        .catch((error: Feilmelding) => settAlert(error))
        .then(() => settLoading(false));
    }
  };

  const getUpdatedData = () =>
    fetchPersonInfo().then((personInfo) => {
      dispatch({
        type: "SETT_PERSON_INFO_RESULT",
        payload: personInfo as PersonInfo,
      });
    });

  const onSuccess = () => {
    settOpprettEllerEndre(false);
  };

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
      {opprettEllerEndre ? (
        <Form onSubmit={submitEndre}>
          <Validation config={config} initialValues={initialValues}>
            {({ submitted, isValid, errors, setField, fields }) => {
              return (
                <RadioGroup
                  legend={msg({ id: "felter.kontonummer.grouplegend" })}
                  error={submitted && errors.norskEllerUtenlandsk}
                >
                  <Radio
                    value={NORSK}
                    checked={fields.norskEllerUtenlandsk === NORSK}
                    onChange={(e) =>
                      setField({ norskEllerUtenlandsk: e.target.value })
                    }
                  >
                    {msg({ id: "felter.kontonummervalg.norsk" })}
                  </Radio>
                  {fields.norskEllerUtenlandsk === NORSK && (
                    <OpprettEllerEndreNorskKontonr
                      personident={personident}
                      kontonummer={kontonr}
                    />
                  )}
                  <Radio
                    value={UTENLANDSK}
                    checked={fields.norskEllerUtenlandsk === UTENLANDSK}
                    onChange={(e) =>
                      setField({ norskEllerUtenlandsk: e.target.value })
                    }
                  >
                    {msg({ id: "felter.kontonummervalg.utenlandsk" })}
                  </Radio>
                  {fields.norskEllerUtenlandsk === UTENLANDSK && (
                    <OpprettEllerEndreUtenlandsbank
                      personident={personident}
                      utenlandskbank={utenlandskbank}
                    />
                  )}
                  <div className="utbetalinger__knapper">
                    <div className="utbetalinger__knapp">
                      <Button
                        variant={"primary"}
                        type={"submit"}
                        disabled={submitted && !isValid}
                        loading={loading}
                      >
                        <FormattedMessage id={"side.lagre"} />
                      </Button>
                    </div>
                    <div className="utbetalinger__knapp">
                      <Button
                        variant={"tertiary"}
                        type={"button"}
                        disabled={loading}
                        onClick={() => settOpprettEllerEndre(false)}
                      >
                        <FormattedMessage id={"side.avbryt"} />
                      </Button>
                    </div>
                  </div>
                  {alert && <HttpFeilmelding {...alert} />}
                </RadioGroup>
              );
            }}
          </Validation>
          <Kilde kilde="personalia.source.nav" lenkeType={"INGEN"} />
        </Form>
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
