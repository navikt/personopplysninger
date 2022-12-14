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
    trigger,
    formState: { errors, isSubmitted },
  } = useFormContext<FormFields>();

  const shouldValidateAdresse = () =>
    validerBankkode(watch().land, watch().bickode, watch().bankkode) ||
    watch().adresse2 ||
    watch().adresse3;

  return (
    <>
      <InputMedHjelpetekst
        {...register("adresse1", {
          validate: {
            required: (v) =>
              shouldValidateAdresse()
                ? v.length > 0 || formatIntl("validation.adresse.pakrevd")
                : true,
            firstCharNotSpace: (v) =>
              v.length > 0
                ? isFirstCharNotSpace(v) ||
                  formatIntl("validation.firstchar.notspace")
                : true,
            notBlacklisted: (v) =>
              v.length > 0
                ? !isBlacklistedCommon(v) ||
                  formatIntl("validation.svarteliste.felles")
                : true,
            noCombinedSpaces: (v) =>
              v.length > 0
                ? !hasMultipleCombinedSpaces(v) ||
                  formatIntl("validation.multiple.spaces")
                : true,
            notOnlyNonLetters: (v) =>
              v.length > 0
                ? !isOnlyNonLetters(v) ||
                  formatIntl("validation.only.space.signs.or.digits")
                : true,
            validAdresselinje: (v) =>
              v.length > 0
                ? isValidAdresselinje(v) ||
                  formatIntl("validation.adresselinje.ugyldig")
                : true,
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
          onChange: () => trigger(["adresse1", "adresse3"]),
          validate: {
            required: (v) =>
              watch().adresse3.length > 0
                ? v.length > 0 || formatIntl("validation.adresselinje.pakrevd")
                : true,
            firstCharNotSpace: (v) =>
              v.length > 0
                ? isFirstCharNotSpace(v) ||
                  formatIntl("validation.firstchar.notspace")
                : true,
            notBlacklisted: (v) =>
              v.length > 0
                ? !isBlacklistedCommon(v) ||
                  formatIntl("validation.svarteliste.felles")
                : true,
            noCombinedSpaces: (v) =>
              v.length > 0
                ? !hasMultipleCombinedSpaces(v) ||
                  formatIntl("validation.multiple.spaces")
                : true,
            notOnlySignsSpace: (v) =>
              v.length > 0
                ? !isOnlySignsSpace(v) ||
                  formatIntl("validation.only.space.or.signs")
                : true,
            validAdresselinje: (v) =>
              v.length > 0
                ? isValidAdresselinje(v) ||
                  formatIntl("validation.adresselinje.ugyldig")
                : true,
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
          onChange: () => trigger(["adresse1", "adresse2"]),
          validate: {
            firstCharNotSpace: (v) =>
              v.length > 0
                ? isFirstCharNotSpace(v) ||
                  formatIntl("validation.firstchar.notspace")
                : true,
            notBlacklisted: (v) =>
              v.length > 0
                ? !isBlacklistedCommon(v) ||
                  formatIntl("validation.svarteliste.felles")
                : true,
            noCombinedSpaces: (v) =>
              v.length > 0
                ? !hasMultipleCombinedSpaces(v) ||
                  formatIntl("validation.multiple.spaces")
                : true,
            notOnlySignsSpace: (v) =>
              v.length > 0
                ? !isOnlySignsSpace(v) ||
                  formatIntl("validation.only.space.or.signs")
                : true,
            validAdresselinje: (v) =>
              v.length > 0
                ? isValidAdresselinje(v) ||
                  formatIntl("validation.adresselinje.ugyldig")
                : true,
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
