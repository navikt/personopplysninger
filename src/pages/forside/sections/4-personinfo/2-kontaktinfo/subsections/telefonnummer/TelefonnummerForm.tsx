import { FormattedMessage, useIntl } from "react-intl";
import React, { useState } from "react";
import { fetchPersonInfo, postTlfnummer } from "clients/apiClient";
import SelectLandskode from "components/felter/select-kodeverk/SelectLandskode";
import { PersonInfo } from "types/personInfo";
import { useStore } from "store/Context";
import HttpFeilmelding, {
  Feilmelding,
} from "components/httpFeilmelding/HttpFeilmelding";
import { Tlfnr } from "../../../../../../../types/personalia";
import { Button, TextField } from "@navikt/ds-react";
import classNames from "classnames";
import { FieldValues, useForm } from "react-hook-form";
import {
  isNorwegianNumber,
  isNotAlreadyRegistered,
  isNumeric,
} from "../../../../../../../utils/validators";

interface Props {
  prioritet: 1 | 2;
  onCancelClick: () => void;
  onChangeSuccess: () => void;
  tlfnr?: Tlfnr;
  type: "endre" | "opprett";
  defaultValues?: {
    landskode: { label: string; value: string };
    tlfnummer: string;
  };
}

const TelefonnummerForm = (props: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors, isValid, isSubmitted },
  } = useForm({
    reValidateMode: "onChange",
    defaultValues: props.defaultValues,
  });
  const { formatMessage: msg } = useIntl();
  const [loading, settLoading] = useState(false);
  const [alert, settAlert] = useState<Feilmelding | undefined>();
  const { prioritet, tlfnr, onChangeSuccess } = props;
  const [{ formKey }, dispatch] = useStore();

  const getUpdatedData = () =>
    fetchPersonInfo().then((personInfo) => {
      dispatch({
        type: "SETT_PERSON_INFO_RESULT",
        payload: personInfo as PersonInfo,
      });
    });

  const submit = (values: FieldValues) => {
    const { landskode, tlfnummer } = values;

    const outbound = {
      prioritet,
      landskode: landskode.value,
      nummer: tlfnummer,
    };

    settLoading(true);
    postTlfnummer(outbound)
      .then(getUpdatedData)
      .then(onChangeSuccess)
      .catch((error: Feilmelding) => settAlert(error))
      .then(() => settLoading(false));
  };

  const tlfNummerMaxLength =
    watch().landskode && watch().landskode.value === "+47" ? 8 : 16;

  return (
    <form
      key={formKey}
      onSubmit={handleSubmit(submit)}
      className={"tlfnummer__form"}
    >
      <div className={"tlfnummer__input-container"}>
        <div
          className={classNames("tlfnummer__input", "tlfnummer__inputLandkode")}
        >
          <SelectLandskode
            {...register("landskode", {
              required: msg({ id: "validation.retningsnr.pakrevd" }),
            })}
            id={"landskode"}
            option={watch().landskode}
            label={msg({ id: "felter.landkode.label" })}
            onChange={(option) => {
              isSubmitted && trigger("tlfnummer");
              option && setValue("landskode", option);
            }}
            error={errors?.landskode?.message}
            submitted={isSubmitted}
          />
        </div>
        <div className={"tlfnummer__input input--m"}>
          <TextField
            {...register("tlfnummer", {
              required: msg({ id: "validation.tlfnr.pakrevd" }),
              validate: {
                isNumeric: (v) =>
                  isNumeric(v) || msg({ id: "validation.tlfnr.siffer" }),
                isNotAlreadyRegistered: (v) =>
                  props.type === "endre" ||
                  (tlfnr && isNotAlreadyRegistered(v, tlfnr)) ||
                  msg({ id: "validation.tlfnr.eksisterer" }),
                isValidNorwegianNumber: (v) =>
                  isNorwegianNumber(watch().landskode)
                    ? v.length === 8 || msg({ id: "validation.tlfnr.norske" })
                    : true,
              },
            })}
            type={"tel"}
            size={"medium"}
            maxLength={tlfNummerMaxLength}
            label={msg({ id: "felter.tlfnr.label" })}
            error={errors?.tlfnummer?.message}
          />
        </div>
      </div>
      <div className={"tlfnummer__knapper"}>
        <div className={"tlfnummer__submit"}>
          <Button
            variant={props.type === "opprett" ? "primary" : "secondary"}
            type={"submit"}
            disabled={isSubmitted && !isValid}
            loading={loading}
          >
            <FormattedMessage id={"side.lagre"} />
          </Button>
        </div>
        <Button
          variant={"tertiary"}
          type={"button"}
          disabled={loading}
          className={"tlfnummer__knapp"}
          onClick={() => {
            settAlert(undefined);
            props.onCancelClick();
          }}
        >
          <FormattedMessage id={"side.avbryt"} />
        </Button>
      </div>
      {alert && <HttpFeilmelding {...alert} type={"advarsel"} />}
    </form>
  );
};
export default TelefonnummerForm;
