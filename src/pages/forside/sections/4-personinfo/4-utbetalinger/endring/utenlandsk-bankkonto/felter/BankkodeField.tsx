import React from "react";
import { useFormContext } from "react-hook-form";
import { FormFields } from "../../types";
import { useIntlFormatter } from "../../../../../../../../hooks/useIntlFormatter";
import InputMedHjelpetekst from "../../../../../../../../components/felter/input-med-hjelpetekst/InputMedHjelpetekst";
import { validerBankkode } from "../../utils";
import {
  isBankkodeValidLength,
  isNumeric,
} from "../../../../../../../../utils/validators";

const BankkodeField = () => {
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
            required: (v) =>
              v.length > 0 || formatIntl("validation.bankkode.pakrevd"),
            numeric: (v) =>
              isNumeric(v) || formatIntl("validation.only.digits"),
            validLength: (v) =>
              isBankkodeValidLength(v, watch().land) ||
              formatIntl("validation.bankkode.lengde"),
          }),
        },
      })}
      id={"bankkode"}
      label={``}
      size="medium"
      submitted={isSubmitted}
      error={errors?.bankkode?.message}
      maxLength={watch().land && watch().land?.bankkodeLengde}
    />
  );
};

export default BankkodeField;
