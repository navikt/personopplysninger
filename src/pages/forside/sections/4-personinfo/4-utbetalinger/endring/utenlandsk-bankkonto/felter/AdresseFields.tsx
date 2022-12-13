import React from "react";
import { useFormContext } from "react-hook-form";
import { FormFields } from "../../types";
import { useIntlFormatter } from "../../../../../../../../hooks/useIntlFormatter";
import InputMedHjelpetekst from "../../../../../../../../components/felter/input-med-hjelpetekst/InputMedHjelpetekst";
import { validerBankkode } from "../../utils";
import {
  hasMultipleCombinedSpaces,
  isBlacklistedCommon,
  isFirstCharNotSpace,
  isOnlyNonLetters,
  isOnlySignsSpace,
  isValidAdresselinje,
} from "../../../../../../../../utils/validators";

const AdresseFields = () => {
  const { formatIntl } = useIntlFormatter();

  const {
    register,
    watch,
    formState: { errors, isSubmitted },
  } = useFormContext<FormFields>();

  return (
    <>
      <InputMedHjelpetekst
        {...register("adresse1", {
          validate: {
            ...((validerBankkode(
              watch().land,
              watch().bickode,
              watch().bankkode
            ) ||
              watch().adresse2 ||
              watch().adresse3) && {
              required: (v) =>
                v.length > 0 || formatIntl("validation.adresse.pakrevd"),
            }),
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
            validAdresselinje: (v) =>
              isValidAdresselinje(v) ||
              formatIntl("validation.adresselinje.ugyldig"),
          },
        })}
        id={"adresse1"}
        size="medium"
        maxLength={34}
        error={errors?.adresse1?.message}
        submitted={isSubmitted}
        label={formatIntl("felter.bankens.adresse.label")}
      />
      <InputMedHjelpetekst
        {...register("adresse2", {
          validate: {
            ...(watch().adresse3 && {
              required: (v) =>
                v || formatIntl("validation.adresselinje.pakrevd"),
            }),
            firstCharNotSpace: (v) =>
              isFirstCharNotSpace(v) ||
              formatIntl("validation.firstchar.notspace"),
            notBlacklisted: (v) =>
              !isBlacklistedCommon(v) ||
              formatIntl("validation.svarteliste.felles"),
            noCombinedSpaces: (v) =>
              !hasMultipleCombinedSpaces(v) ||
              formatIntl("validation.multiple.spaces"),
            notOnlySignsSpace: (v) =>
              !isOnlySignsSpace(v) ||
              formatIntl("validation.only.space.or.signs"),
            validAdresselinje: (v) =>
              isValidAdresselinje(v) ||
              formatIntl("validation.adresselinje.ugyldig"),
          },
        })}
        id={"adresse2"}
        label={""}
        size="medium"
        maxLength={34}
        error={errors?.adresse2?.message}
        submitted={isSubmitted}
      />
      <InputMedHjelpetekst
        {...register("adresse3", {
          validate: {
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
            validAdresselinje: (v) =>
              isValidAdresselinje(v) ||
              formatIntl("validation.adresselinje.ugyldig"),
          },
        })}
        id={"adresse3"}
        label={""}
        size="medium"
        maxLength={34}
        error={errors?.adresse3?.message}
        submitted={isSubmitted}
      />
    </>
  );
};

export default AdresseFields;
