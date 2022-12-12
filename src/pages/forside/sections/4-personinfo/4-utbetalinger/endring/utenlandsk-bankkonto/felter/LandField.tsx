import React, { ForwardedRef } from "react";
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

const LandField = React.forwardRef((_, ref: ForwardedRef<any>) => {
  const { formatIntl } = useIntlFormatter();

  const {
    register,
    setValue,
    watch,
    formState: { errors, isSubmitted },
  } = useFormContext<FormFields>();

  return (
    <SelectLand
      {...register("land", {
        required: formatIntl("validation.land.pakrevd"),
      })}
      submitted={isSubmitted}
      label={formatIntl("felter.bankensland.label")}
      error={errors?.land?.message}
      option={watch().land}
      onChange={(option) => {
        const bankkodeRetningsnummer = option ? BANKKODER[option.value] : null;

        setValue("land", option);
        bankkodeRetningsnummer &&
          setValue("retningsnummer", bankkodeRetningsnummer);
      }}
      ref={ref}
    />
  );
});

export default LandField;
