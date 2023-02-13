import React, { useState } from "react";
import { Button, Radio, RadioGroup } from "@navikt/ds-react";
import OpprettEllerEndreNorskKontonr, {
  setOutboundNorskKontonummer,
} from "./norsk-bankkonto/NorskKontonummer";
import OpprettEllerEndreUtenlandsbank, {
  setOutboundUtenlandsbankonto,
} from "./utenlandsk-bankkonto/UtenlandsBankkonto";
import { FormattedMessage, useIntl } from "react-intl";
import HttpFeilmelding, {
  Feilmelding,
} from "../../../../../../components/httpFeilmelding/HttpFeilmelding";
import Kilde from "../../../../../../components/kilde/Kilde";
import { normalizeNummer } from "../../../../../../utils/formattering";
import {
  fetchPersonInfo,
  postKontonummer,
} from "../../../../../../clients/apiClient";
import { PersonInfo } from "../../../../../../types/personInfo";
import { useStore } from "../../../../../../store/Context";
import { UtenlandskBankkonto } from "../../../../../../types/personalia";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import {
  FormFields,
  OutboundNorskKontonummer,
  OutboundUtenlandsbankonto,
} from "./types";
import { UNKNOWN } from "../../../../../../utils/text";
import { Action } from "../../../../../../store/Store";

interface Props {
  utenlandskbank?: UtenlandskBankkonto;
  personident?: { verdi: string; type: string };
  kontonr?: string;
  settOpprettEllerEndre: (arg: boolean) => void;
  submit?: () => void;
}

const NORSK = "NORSK";
const UTENLANDSK = "UTENLANDSK";

const KontonummerForm = (props: Props) => {
  const { kontonr, utenlandskbank, personident, settOpprettEllerEndre } = props;

  const { submit = defaultSubmitKontonummer } = props;

  const methods = useForm<FormFields>({
    reValidateMode: "onChange",
    defaultValues: utenlandskbank
      ? {
          ...utenlandskbank,
          kontonummer: undefined,
          kontonummerIban: utenlandskbank.kontonummer || utenlandskbank.iban,
          bickode: utenlandskbank.swiftkode,
          land: {
            label: utenlandskbank.land.toUpperCase(),
            value: UNKNOWN,
          },
          valuta: {
            label: utenlandskbank.valuta,
            value: UNKNOWN,
          },
        }
      : {
          kontonummer: kontonr,
        },
  });

  const {
    handleSubmit,
    reset,
    formState: { isValid, isSubmitted },
  } = methods;

  const { formatMessage: msg } = useIntl();
  const [loading, settLoading] = useState<boolean>(false);
  const [alert, settAlert] = useState<Feilmelding | null>(null);
  const [kontonummerType, setKontonummerType] = useState(
    utenlandskbank ? UTENLANDSK : NORSK
  );

  const [, dispatch] = useStore();

  const onSubmit = (values: FieldValues) => {
    submit(
      values,
      kontonummerType,
      settAlert,
      settLoading,
      settOpprettEllerEndre,
      dispatch
    );
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <RadioGroup
          legend={msg({ id: "felter.kontonummer.grouplegend" })}
          defaultValue={kontonummerType}
        >
          <Radio
            value={NORSK}
            onChange={(e) => {
              setKontonummerType(e.target.value);
              reset();
            }}
          >
            {msg({ id: "felter.kontonummervalg.norsk" })}
          </Radio>
          {kontonummerType === NORSK && (
            <OpprettEllerEndreNorskKontonr personident={personident} />
          )}
          <Radio
            value={UTENLANDSK}
            onChange={(e) => {
              setKontonummerType(e.target.value);
              reset();
            }}
          >
            {msg({ id: "felter.kontonummervalg.utenlandsk" })}
          </Radio>
          {kontonummerType === UTENLANDSK && (
            <OpprettEllerEndreUtenlandsbank personident={personident} />
          )}
          <div className="utbetalinger__knapper">
            <div className="utbetalinger__knapp">
              <Button
                variant={"primary"}
                type={"submit"}
                disabled={isSubmitted && !isValid}
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
        <Kilde kilde="personalia.source.nav" lenkeType={"INGEN"} />
      </form>
    </FormProvider>
  );
};

const defaultSubmitKontonummer = (
  values: FieldValues,
  kontonummerType: string,
  settAlert: (value: Feilmelding) => void,
  settLoading: (value: boolean) => void,
  settOpprettEllerEndre: (value: boolean) => void,
  dispatch: React.Dispatch<Action>
) => {
  type Outbound = OutboundNorskKontonummer | OutboundUtenlandsbankonto;
  const outbound: { [key: string]: () => Outbound } = {
    NORSK: () => {
      values.kontonummer = normalizeNummer(values.kontonummer);
      return setOutboundNorskKontonummer(values);
    },
    UTENLANDSK: () => setOutboundUtenlandsbankonto(values),
  };

  settLoading(true);
  postKontonummer(outbound[kontonummerType]())
    .then(() => getUpdatedData(dispatch))
    .then(() => settOpprettEllerEndre(false))
    .catch((error: Feilmelding) => settAlert(error))
    .then(() => settLoading(false));
};

const getUpdatedData = (dispatch: React.Dispatch<Action>) =>
  fetchPersonInfo().then((personInfo) => {
    dispatch({
      type: "SETT_PERSON_INFO_RESULT",
      payload: personInfo as PersonInfo,
    });
  });

export default KontonummerForm;
