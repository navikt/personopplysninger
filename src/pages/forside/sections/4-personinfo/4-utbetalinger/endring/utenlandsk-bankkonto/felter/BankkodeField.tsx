import React from "react";
import { useFormContext } from "react-hook-form";
import { FormFields } from "../../types";
import InputMedHjelpetekst from "../../../../../../../../components/felter/input-med-hjelpetekst/InputMedHjelpetekst";
import { validerBankkode } from "../../utils";
import {
  isBankkodeValidLength,
  isNumeric,
} from "../../../../../../../../utils/validators";
import { useIntlFormatter } from "../../../../../../../../hooks/useIntlFormatter";

const BankkodeField = () => {
  const { formatMessage, formatMessageWithValues } = useIntlFormatter();

  const {
    register,
    watch,
    formState: { errors },
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
              !!v || formatMessage("validation.bankkode.pakrevd"),
            numeric: (v) =>
              isNumeric(v) || formatMessage("validation.only.digits"),
            validLength: (v) =>
              isBankkodeValidLength(v, watch().land) ||
              formatMessageWithValues("validation.bankkode.lengde", {
                land: watch().land?.label,
                siffer: watch().land?.bankkodeLengde,
              }),
          }),
        },
      })}
      id={"bankkode"}
      label={``}
      size="medium"
      error={errors?.bankkode?.message}
      maxLength={watch().land && watch().land?.bankkodeLengde}
    />
  );
};

export default BankkodeField;
