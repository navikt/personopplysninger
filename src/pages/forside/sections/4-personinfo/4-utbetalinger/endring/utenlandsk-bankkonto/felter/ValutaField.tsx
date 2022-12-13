import React from "react";
import SelectValuta from "components/felter/select-kodeverk/SelectValuta";
import { useFormContext } from "react-hook-form";
import { FormFields } from "../../types";
import { useIntlFormatter } from "../../../../../../../../hooks/useIntlFormatter";

export const BIC = "BIC";
export const BANKKODER: { [key: string]: string } = {
  US: "FW",
  NZ: "NZ",
  AU: "AU",
  ZA: "ZA",
  CA: "CC",
  RU: "RU",
};

const ValutaField = () => {
  const { formatIntl } = useIntlFormatter();

  const {
    register,
    setValue,
    watch,
    trigger,
    formState: { errors, isSubmitted },
  } = useFormContext<FormFields>();

  return (
    <SelectValuta
      {...register("valuta", {
        required: formatIntl("validation.valuta.pakrevd"),
      })}
      submitted={isSubmitted}
      label={formatIntl("felter.valuta.label")}
      hjelpetekst={"utbetalinger.hjelpetekster.valuta"}
      option={watch().valuta}
      onChange={(value) => {
        setValue("valuta", value);
        isSubmitted && trigger();
      }}
      error={errors?.valuta?.message}
    />
  );
};

export default ValutaField;
