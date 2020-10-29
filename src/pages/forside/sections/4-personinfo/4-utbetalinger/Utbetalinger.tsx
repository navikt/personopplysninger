import React, { useState } from "react";
import Box from "components/box/Box";
import kontonummerIkon from "assets/img/Kontonummer.svg";
import { UtenlandskBankkonto } from "types/personalia";
import Kilde from "components/kilde/Kilde";
import endreIkon from "assets/img/Pencil.svg";
import leggTilIkon from "assets/img/Pencil.svg";
import NorskKontonummer from "./visning/NorskKontonummer";
import Utenlandskonto from "./visning/UtenlandsBankkonto";
import OpprettEllerEndreNorskKontonr from "./endring/NorskKontonummer";
import { setOutboundNorskKontonummer } from "./endring/NorskKontonummer";
import { OutboundNorskKontonummer } from "./endring/NorskKontonummer";
import OpprettEllerEndreUtenlandsbank from "./endring/utenlandsk-bankkonto/UtenlandsBankkonto";
import { setOutboundUtenlandsbankonto } from "./endring/utenlandsk-bankkonto/UtenlandsBankkonto";
import { OutboundUtenlandsbankonto } from "./endring/utenlandsk-bankkonto/UtenlandsBankkonto";
import { Radio, RadioGruppe } from "nav-frontend-skjema";
import { FormattedMessage, useIntl } from "react-intl";
import { Knapp } from "nav-frontend-knapper";
import Alert, { AlertType } from "components/alert/Alert";
import { Form, FormContext, Validation } from "calidation";
import { fetchPersonInfo, postKontonummer } from "clients/apiClient";
import { PersonInfo } from "types/personInfo";
import { useStore } from "store/Context";
import driftsmeldinger from "driftsmeldinger";
import { AlertStripeAdvarsel } from "nav-frontend-alertstriper";

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
  const [opprettEllerEndre, settOpprettEllerEndre] = useState<boolean>();
  const [alert, settAlert] = useState<AlertType | undefined>();
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
        NORSK: () => setOutboundNorskKontonummer(context),
        UTENLANDSK: () => setOutboundUtenlandsbankonto(context),
      };

      settLoading(true);
      postKontonummer(outbound[fields.norskEllerUtenlandsk]())
        .then(getUpdatedData)
        .then(onSuccess)
        .catch((error: AlertType) => settAlert(error))
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
    <Box id="utbetaling" tittel="utbetalinger.tittel" icon={kontonummerIkon}>
      <>
        {driftsmeldinger.pdl && (
          <div style={{ paddingBottom: "1rem" }}>
            <AlertStripeAdvarsel>{driftsmeldinger.pdl}</AlertStripeAdvarsel>
          </div>
        )}
        <Alert type={"feil"} code={0} text={"Vi har for tiden tekniske problemer med å vise utenlandske kontonumre. Vi jobber med å rette feilen."} />
      </>
      {opprettEllerEndre ? (
        <Form onSubmit={submitEndre}>
          <Validation config={config} initialValues={initialValues}>
            {({ submitted, isValid, errors, setField, fields }) => {
              return (
                <RadioGruppe feil={submitted && errors.norskEllerUtenlandsk}>
                  <Radio
                    name={NORSK}
                    checked={fields.norskEllerUtenlandsk === NORSK}
                    label={msg({ id: "felter.kontonummervalg.norsk" })}
                    onChange={(e) =>
                      setField({ norskEllerUtenlandsk: e.target.name })
                    }
                  />
                  {fields.norskEllerUtenlandsk === NORSK && (
                    <OpprettEllerEndreNorskKontonr
                      personident={personident}
                      kontonummer={kontonr}
                    />
                  )}
                  <Radio
                    name={UTENLANDSK}
                    checked={fields.norskEllerUtenlandsk === UTENLANDSK}
                    label={msg({ id: "felter.kontonummervalg.utenlandsk" })}
                    onChange={(e) =>
                      setField({ norskEllerUtenlandsk: e.target.name })
                    }
                  />
                  {fields.norskEllerUtenlandsk === UTENLANDSK && (
                    <OpprettEllerEndreUtenlandsbank
                      personident={personident}
                      utenlandskbank={utenlandskbank}
                    />
                  )}
                  <div className="utbetalinger__knapper">
                    <div className="utbetalinger__knapp">
                      <Knapp
                        type={"standard"}
                        htmlType={"submit"}
                        disabled={submitted && !isValid}
                        autoDisableVedSpinner={true}
                        spinner={loading}
                      >
                        <FormattedMessage id={"side.lagre"} />
                      </Knapp>
                    </div>
                    <div className="utbetalinger__knapp">
                      <Knapp
                        type={"flat"}
                        htmlType={"button"}
                        disabled={loading}
                        onClick={() => settOpprettEllerEndre(false)}
                      >
                        <FormattedMessage id={"side.avbryt"} />
                      </Knapp>
                    </div>
                  </div>
                  {alert && <Alert {...alert} />}
                </RadioGruppe>
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
