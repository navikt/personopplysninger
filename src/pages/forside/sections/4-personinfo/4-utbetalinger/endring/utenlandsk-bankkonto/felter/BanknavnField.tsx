import React from "react";
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

const BanknavnField = () => {
  const { formatMessage } = useIntlFormatter();

  const {
    register,
    formState: { errors },
  } = useFormContext<FormFields>();

  return (
    <InputMedHjelpetekst
      {...register("banknavn", {
        validate: {
          required: (v) => !!v || formatMessage("validation.banknavn.pakrevd"),
          firstCharNotSpace: (v) =>
            isFirstCharNotSpace(v) ||
            formatMessage("validation.firstchar.notspace"),
          notBlacklisted: (v) =>
            !isBlacklistedCommon(v) ||
            formatMessage("validation.svarteliste.felles"),
          noCombinedSpaces: (v) =>
            !hasMultipleCombinedSpaces(v) ||
            formatMessage("validation.multiple.spaces"),
          notOnlyNonLetters: (v) =>
            !isOnlyNonLetters(v) ||
            formatMessage("validation.only.space.signs.or.digits"),
          validBanknavn: (v) =>
            isValidBanknavn(v) || formatMessage("validation.banknavn.ugyldig"),
        },
      })}
      id={"banknavn"}
      size="medium"
      maxLength={35}
      htmlSize={37}
      label={formatMessage("felter.banknavn.label")}
      error={errors?.banknavn?.message}
    />
  );
};

export default BanknavnField;
