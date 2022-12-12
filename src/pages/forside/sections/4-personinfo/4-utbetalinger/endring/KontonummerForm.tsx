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

interface Props {
  utenlandskbank?: UtenlandskBankkonto;
  personident?: { verdi: string; type: string };
  kontonr?: string;
  settOpprettEllerEndre: (arg: boolean) => void;
}

const NORSK = "NORSK";
const UTENLANDSK = "UTENLANDSK";

const KontonummerForm = (props: Props) => {
  const { kontonr, utenlandskbank, personident, settOpprettEllerEndre } = props;

  const methods = useForm<FormFields>({
    reValidateMode: "onChange",
    defaultValues: utenlandskbank
      ? {
          ...utenlandskbank,
          norskEllerUtenlandsk: UTENLANDSK,
          bickode: utenlandskbank.swiftkode,
          kontonummer: utenlandskbank.kontonummer || utenlandskbank.iban,
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
          norskEllerUtenlandsk: NORSK,
          kontonummer: kontonr,
        },
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid, isSubmitted },
  } = methods;

  const { formatMessage: msg } = useIntl();
  const [loading, settLoading] = useState<boolean>(false);
  const [alert, settAlert] = useState<Feilmelding | null>(null);

  const [, dispatch] = useStore();

  const submitEndre = (values: FieldValues) => {
    type Outbound = OutboundNorskKontonummer | OutboundUtenlandsbankonto;
    const outbound: { [key: string]: () => Outbound } = {
      NORSK: () => {
        values.kontonummer = normalizeNummer(values.kontonummer);
        return setOutboundNorskKontonummer(values);
      },
      UTENLANDSK: () => setOutboundUtenlandsbankonto(values),
    };

    settLoading(true);
    postKontonummer(outbound[values.norskEllerUtenlandsk]())
      .then(getUpdatedData)
      .then(onSuccess)
      .catch((error: Feilmelding) => settAlert(error))
      .then(() => settLoading(false));
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
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(submitEndre)}>
        <RadioGroup
          {...register("norskEllerUtenlandsk", {
            required: msg({ id: "felter.type.velg" }),
          })}
          legend={msg({ id: "felter.kontonummer.grouplegend" })}
          error={isSubmitted && errors?.norskEllerUtenlandsk?.message}
          value={watch().norskEllerUtenlandsk}
        >
          <Radio
            {...register("norskEllerUtenlandsk")}
            value={NORSK}
            onChange={(e) => setValue("norskEllerUtenlandsk", e.target.value)}
          >
            {msg({ id: "felter.kontonummervalg.norsk" })}
          </Radio>
          {watch().norskEllerUtenlandsk === NORSK && (
            <OpprettEllerEndreNorskKontonr personident={personident} />
          )}
          <Radio
            {...register("norskEllerUtenlandsk")}
            value={UTENLANDSK}
            onChange={(e) => setValue("norskEllerUtenlandsk", e.target.value)}
          >
            {msg({ id: "felter.kontonummervalg.utenlandsk" })}
          </Radio>
          {watch().norskEllerUtenlandsk === UTENLANDSK && (
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

export default KontonummerForm;
