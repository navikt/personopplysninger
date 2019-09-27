import React, { useState } from "react";
import Box from "components/box/Box";
import kontonummerIkon from "assets/img/Kontonummer.svg";
import { UtenlandskBankkonto } from "types/personalia";
import Kilde from "components/kilde/Kilde";
import endreIkon from "assets/img/Pencil.svg";
import leggTilIkon from "assets/img/Pencil.svg";
import Melding from "components/melding/Melding";
import NorskKontonummer from "./visning/NorskKontonummer";
import Utenlandskonto from "./visning/UtenlandsBankkonto";
import OpprettEllerEndreNorskKontonr from "./endring/NorskKontonummer";
import { setOutboundNorskKontonummer } from "./endring/NorskKontonummer";
import { OutboundNorskKontonummer } from "./endring/NorskKontonummer";
import OpprettEllerEndreUtenlandsbank from "./endring/UtenlandsBankkonto";
import { setOutboundUtenlandsbankonto } from "./endring/UtenlandsBankkonto";
import { OutboundUtenlandsbankonto } from "./endring/UtenlandsBankkonto";
import { SkjemaGruppe, Radio } from "nav-frontend-skjema";
import { FormattedMessage, InjectedIntlProps, injectIntl } from "react-intl";
import { Knapp } from "nav-frontend-knapper";
import Alert, { AlertType } from "components/alert/Alert";
import { Form, FormContext, Validation } from "calidation";
import { sjekkForFeil } from "utils/validators";
import { fetchPersonInfo, postKontonummer } from "clients/apiClient";
import { PersonInfo } from "types/personInfo";
import { useStore } from "providers/Provider";

interface Props {
  utenlandskbank?: UtenlandskBankkonto;
  kontonr?: string;
}

const NORSK = "NORSK";
const UTENLANDSK = "UTENLANDSK";

const UtbetalingerPDL = (props: Props & InjectedIntlProps) => {
  const { kontonr, utenlandskbank, intl } = props;
  const [loading, settLoading] = useState(false);
  const [opprettEllerEndre, settOpprettEllerEndre] = useState();
  const [alert, settAlert] = useState<AlertType | undefined>();
  const [, dispatch] = useStore();

  const initialValues = {
    type: kontonr ? NORSK : utenlandskbank ? UTENLANDSK : undefined
  };

  const config = {
    type: {
      isRequired: intl.messages["felter.type.velg"]
    }
  };

  const submitEndre = (context: FormContext) => {
    const { isValid, fields } = context;
    if (isValid) {
      type Outbound = OutboundNorskKontonummer | OutboundUtenlandsbankonto;
      const outbound: { [key: string]: () => Outbound } = {
        NORSK: () => setOutboundNorskKontonummer(context),
        UTENLANDSK: () => setOutboundUtenlandsbankonto(context)
      };

      settLoading(true);
      postKontonummer(outbound[fields.type]())
        .then(getUpdatedData)
        .then(onSuccess)
        .catch((error: AlertType) => settAlert(error))
        .then(() => settLoading(false));
    }
  };

  const getUpdatedData = () =>
    fetchPersonInfo().then(personInfo => {
      dispatch({
        type: "SETT_PERSON_INFO_RESULT",
        payload: personInfo as PersonInfo
      });
    });

  const onSuccess = () => {
    settOpprettEllerEndre(false);
  };

  return (
    <Box id="utbetaling" tittel="utbetalinger.tittel" icon={kontonummerIkon}>
      {opprettEllerEndre ? (
        <Form onSubmit={submitEndre}>
          <Validation config={config} initialValues={initialValues}>
            {({ submitted, isValid, errors, setField, fields }) => (
              <SkjemaGruppe feil={sjekkForFeil(submitted, errors.type)}>
                <Radio
                  name={NORSK}
                  checked={fields.type === NORSK}
                  label={intl.messages["felter.kontonummervalg.norsk"]}
                  onChange={e => setField({ type: e.target.name })}
                />
                {fields.type === NORSK && (
                  <OpprettEllerEndreNorskKontonr kontonummer={kontonr} />
                )}
                <Radio
                  name={UTENLANDSK}
                  checked={fields.type === UTENLANDSK}
                  label={intl.messages["felter.kontonummervalg.utenlandsk"]}
                  onChange={e => setField({ type: e.target.name })}
                />
                {fields.type === UTENLANDSK && (
                  <OpprettEllerEndreUtenlandsbank
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
              </SkjemaGruppe>
            )}
          </Validation>
        </Form>
      ) : (
        <>
          {kontonr || utenlandskbank ? (
            <>
              <NorskKontonummer kontonummer={kontonr} />
              <Utenlandskonto utenlandskBankkonto={utenlandskbank} />
            </>
          ) : (
            <Melding meldingId="personalia.kontonr.ingenData" />
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

export default injectIntl(UtbetalingerPDL);
