import React from "react";
import { useIntl } from "react-intl";
import { TextField } from "@navikt/ds-react";
import { normalizeNummer } from "../../../../../../../utils/formattering";
import { FieldValues, useFormContext } from "react-hook-form";
import {
  isNormalizedLength,
  isNormalizedMod11,
} from "../../../../../../../utils/validators";

interface Props {
  personident?: { verdi: string; type: string };
  kontonummer?: string;
}

const OpprettEllerEndreNorskKontonr = (props: Props) => {
  const { formatMessage: msg } = useIntl();
  const { kontonummer } = props;

  const {
    register,
    formState: { errors, isSubmitted },
  } = useFormContext();

  return (
    <>
      <div className="utbetalinger__input input--m">
        <TextField
          {...register("kontonummer", {
            required: msg({ id: "validation.kontonummer.pakrevd" }),
            validate: {
              isNormalizedLength11: (v) =>
                isNormalizedLength(v, 11) ||
                msg({ id: "validation.kontonummer.elleve" }),
              isMod11: (v) =>
                isNormalizedMod11(v) ||
                msg({ id: "validation.kontonummer.mod11" }),
              isNotYourSSN: (v) =>
                v !== props.personident?.verdi ||
                msg({ id: "validation.kontonummer.idnr" }),
            },
          })}
          defaultValue={kontonummer || undefined}
          size={"medium"}
          htmlSize={14}
          maxLength={16}
          label={msg({ id: "felter.kontonummer.label" })}
          error={isSubmitted && errors?.kontonummer?.message}
        />
      </div>
    </>
  );
};

export const setOutboundNorskKontonummer = (values: FieldValues) => {
  const { kontonummer } = values;
  return {
    value: normalizeNummer(kontonummer),
  };
};

export default OpprettEllerEndreNorskKontonr;
