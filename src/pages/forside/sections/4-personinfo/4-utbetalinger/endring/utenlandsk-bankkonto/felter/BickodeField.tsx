import React from "react";
import { useFormContext } from "react-hook-form";
import { FormFields } from "../../types";
import { useIntlFormatter } from "../../../../../../../../hooks/useIntlFormatter";
import InputMedHjelpetekst from "../../../../../../../../components/felter/input-med-hjelpetekst/InputMedHjelpetekst";
import { validerBic } from "../../utils";
import {
  isBICCountryCompliant,
  isLettersAndDigits,
} from "../../../../../../../../utils/validators";
import { isValidBIC } from "ibantools";

const BickodeField = () => {
  const { formatIntl } = useIntlFormatter();

  const {
    register,
    watch,
    formState: { errors, isSubmitted },
  } = useFormContext<FormFields>();

  return (
    <InputMedHjelpetekst
      {...register("bickode", {
        validate: {
          ...(validerBic(watch().land, watch().bickode, watch().bankkode) && {
            required: (v) =>
              v.length > 0 || formatIntl("validation.bic.pakrevd"),
            lettersAndDigits: (v) =>
              isLettersAndDigits(v) ||
              formatIntl("validation.only.letters.and.digits"),
            validBic: (v) =>
              isValidBIC(v) || formatIntl("validation.bic.gyldig"),
            bicCountryCompliant: (v) =>
              isBICCountryCompliant(v, watch().land) ||
              formatIntl("validation.bic.country"),
          }),
        },
      })}
      id={"bickode"}
      size="medium"
      maxLength={11}
      submitted={isSubmitted}
      hjelpetekst={"utbetalinger.hjelpetekster.bic"}
      label={formatIntl("felter.bic.label")}
      error={errors?.bickode?.message}
    />
  );
};

export default BickodeField;
