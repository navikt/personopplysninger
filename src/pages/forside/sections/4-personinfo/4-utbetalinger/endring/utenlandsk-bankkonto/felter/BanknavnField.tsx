import React, { ForwardedRef } from "react";
import InputMedHjelpetekst from "components/felter/input-med-hjelpetekst/InputMedHjelpetekst";
import { useFormContext } from "react-hook-form";
import { FormFields } from "../../types";
import {
  hasMultipleCombinedSpaces,
  isBlacklistedCommon,
  isFirstCharNotSpace,
  isOnlyNonLetters,
  isValidBanknavn,
} from "../../../../../../../../utils/validators";
import { useIntlFormatter } from "../../../../../../../../hooks/useIntlFormatter";

const BanknavnField = React.forwardRef((_, ref: ForwardedRef<any>) => {
  const { formatIntl } = useIntlFormatter();

  const {
    register,
    setValue,
    formState: { errors, isSubmitted },
  } = useFormContext<FormFields>();

  return (
    <InputMedHjelpetekst
      {...register("banknavn", {
        validate: {
          required: (v) => v || formatIntl("validation.banknavn.pakrevd"),
          firstCharNotSpace: (v) =>
            isFirstCharNotSpace(v) ||
            formatIntl("validation.firstchar.notspace"),
          notBlacklisted: (v) =>
            !isBlacklistedCommon(v) ||
            formatIntl("validation.svarteliste.felles"),
          noCombinedSpaces: (v) =>
            !hasMultipleCombinedSpaces(v) ||
            formatIntl("validation.multiple.spaces"),
          notOnlyNonLetters: (v) =>
            !isOnlyNonLetters(v) ||
            formatIntl("validation.only.space.signs.or.digits"),
          validBanknavn: (v) =>
            isValidBanknavn(v) || formatIntl("validation.banknavn.ugyldig"),
        },
      })}
      id={"banknavn"}
      size="medium"
      maxLength={35}
      htmlSize={37}
      submitted={isSubmitted}
      label={formatIntl("felter.banknavn.label")}
      onChange={(value) => setValue("banknavn", value)}
      error={errors?.banknavn?.message}
      ref={ref}
    />
  );
});

export default BanknavnField;
