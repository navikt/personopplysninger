import React from "react";
import SelectLand from "components/felter/select-kodeverk/SelectLand";
import { useFormContext } from "react-hook-form";
import { FormFields } from "../../types";
import { useIntlFormatter } from "../../../../../../../../hooks/useIntlFormatter";

export const BANKKODER: { [key: string]: string } = {
  US: "FW",
  NZ: "NZ",
  AU: "AU",
  ZA: "ZA",
  CA: "CC",
  RU: "RU",
};

const LandField = () => {
  const { formatMessage } = useIntlFormatter();

  const {
    register,
    setValue,
    watch,
    trigger,
    formState: { errors, isSubmitted },
  } = useFormContext<FormFields>();

  return (
    <SelectLand
      {...register("land", {
        required: formatMessage("validation.land.pakrevd"),
      })}
      submitted={isSubmitted}
      label={formatMessage("felter.bankensland.label")}
      error={errors?.land?.message}
      option={watch().land}
      onChange={(option) => {
        const bankkodeRetningsnummer = option ? BANKKODER[option.value] : null;
        setValue("land", option);
        bankkodeRetningsnummer &&
          setValue("retningsnummer", bankkodeRetningsnummer);
        isSubmitted && trigger();
      }}
    />
  );
};

export default LandField;
