import React, { ForwardedRef } from "react";
import { useFormContext } from "react-hook-form";
import { FormFields } from "../../types";
import { useIntlFormatter } from "../../../../../../../../hooks/useIntlFormatter";
import InputMedHjelpetekst from "../../../../../../../../components/felter/input-med-hjelpetekst/InputMedHjelpetekst";
import { validerBankkode } from "../../utils";
import {
  isBankkodeValidLength,
  isNumeric,
} from "../../../../../../../../utils/validators";

const BankkodeField = React.forwardRef((_, ref: ForwardedRef<any>) => {
  const { formatIntl } = useIntlFormatter();

  const {
    register,
    setValue,
    watch,
    formState: { errors, isSubmitted },
  } = useFormContext<FormFields>();

  return (
    <InputMedHjelpetekst
      {...register("bankkode", {
        validate: {
          ...(validerBankkode(
            watch().land,
            watch().bickode,
            watch().bankkode
          ) && {
            required: (v) => v || formatIntl("validation.bankkode.pakrevd"),
            numeric: (v) =>
              isNumeric(v) || formatIntl("validation.only.digits"),
            validLength: (v) =>
              isBankkodeValidLength(v, watch().land) || formatIntl(""),
          }),
        },
      })}
      id={"bankkode"}
      label={``}
      size="medium"
      submitted={isSubmitted}
      error={errors?.bankkode?.message}
      onChange={(value) => setValue("bankkode", value)}
      maxLength={watch().land && watch().land?.bankkodeLengde}
      ref={ref}
    />
  );
});

export default BankkodeField;
