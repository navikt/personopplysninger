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
  const { formatMessage } = useIntlFormatter();

  const {
    register,
    watch,
    trigger,
    formState: { errors, isSubmitted },
  } = useFormContext<FormFields>();

  return (
    <InputMedHjelpetekst
      {...register("bickode", {
        onChange: () => isSubmitted && trigger(),
        validate: {
          ...(validerBic(watch().land, watch().bickode, watch().bankkode) && {
            required: (v) => !!v || formatMessage("validation.bic.pakrevd"),
            lettersAndDigits: (v) =>
              isLettersAndDigits(v) ||
              formatMessage("validation.only.letters.and.digits"),
            validBic: (v) =>
              isValidBIC(v) || formatMessage("validation.bic.gyldig"),
            bicCountryCompliant: (v) =>
              isBICCountryCompliant(v, watch().land) ||
              formatMessage("validation.bic.country"),
          }),
        },
      })}
      id={"bickode"}
      size="medium"
      maxLength={11}
      hjelpetekst={"utbetalinger.hjelpetekster.bic"}
      label={formatMessage("felter.bic.label")}
      error={errors?.bickode?.message}
    />
  );
};

export default BickodeField;
