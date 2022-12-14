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
    !!watch().adresse2 ||
    !!watch().adresse3;

  const validateIfSet = (
    value: string,
    validationResult: boolean,
    messageId: string
  ) => (!!value ? validationResult || formatIntl(messageId) : true);

  const requiredOnCondition = (
    value: string,
    condition: boolean,
    messageId: string
  ) => (condition ? !!value || formatIntl(messageId) : true);

  const adressePakrevd = "validation.adresse.pakrevd";
  const adresselinjePakrevd = "validation.adresselinje.pakrevd";
  const firstCharNotSpace = "validation.firstchar.notspace";
  const svartelisteFelles = "validation.svarteliste.felles";
  const multipleSpaces = "validation.multiple.spaces";
  const onlySpaceSignsDigits = "validation.only.space.signs.or.digits";
  const onlySpaceSigns = "validation.only.space.or.signs";
  const adresselinjeUgyldig = "validation.adresselinje.ugyldig";

  return (
    <>
      <InputMedHjelpetekst
        {...register("adresse1", {
          validate: {
            required: (v) =>
              requiredOnCondition(v, shouldValidateAdresse(), adressePakrevd),
            firstCharNotSpace: (v) =>
              validateIfSet(v, isFirstCharNotSpace(v), firstCharNotSpace),
            notBlacklisted: (v) =>
              validateIfSet(v, !isBlacklistedCommon(v), svartelisteFelles),
            noCombinedSpaces: (v) =>
              validateIfSet(v, !hasMultipleCombinedSpaces(v), multipleSpaces),
            notOnlyNonLetters: (v) =>
              validateIfSet(v, !isOnlyNonLetters(v), onlySpaceSignsDigits),
            validAdresselinje: (v) =>
              validateIfSet(v, isValidAdresselinje(v), adresselinjeUgyldig),
          },
        })}
        id={"adresse1"}
        size="medium"
        maxLength={34}
        error={errors?.adresse1?.message}
        label={formatIntl("felter.bankens.adresse.label")}
      />
      <InputMedHjelpetekst
        {...register("adresse2", {
          onChange: () => isSubmitted && trigger(["adresse1", "adresse3"]),
          validate: {
            required: (v) =>
              requiredOnCondition(v, !!watch().adresse3, adresselinjePakrevd),
            firstCharNotSpace: (v) =>
              validateIfSet(v, isFirstCharNotSpace(v), firstCharNotSpace),
            notBlacklisted: (v) =>
              validateIfSet(v, !isBlacklistedCommon(v), svartelisteFelles),
            noCombinedSpaces: (v) =>
              validateIfSet(v, !hasMultipleCombinedSpaces(v), multipleSpaces),
            notOnlyNonLetters: (v) =>
              validateIfSet(v, !isOnlySignsSpace(v), onlySpaceSigns),
            validAdresselinje: (v) =>
              validateIfSet(v, isValidAdresselinje(v), adresselinjeUgyldig),
          },
        })}
        id={"adresse2"}
        label={""}
        size="medium"
        maxLength={34}
        error={errors?.adresse2?.message}
      />
      <InputMedHjelpetekst
        {...register("adresse3", {
          onChange: () => isSubmitted && trigger(["adresse1", "adresse2"]),
          validate: {
            firstCharNotSpace: (v) =>
              validateIfSet(v, isFirstCharNotSpace(v), firstCharNotSpace),
            notBlacklisted: (v) =>
              validateIfSet(v, !isBlacklistedCommon(v), svartelisteFelles),
            noCombinedSpaces: (v) =>
              validateIfSet(v, !hasMultipleCombinedSpaces(v), multipleSpaces),
            notOnlyNonLetters: (v) =>
              validateIfSet(v, !isOnlySignsSpace(v), onlySpaceSigns),
            validAdresselinje: (v) =>
              validateIfSet(v, isValidAdresselinje(v), adresselinjeUgyldig),
          },
        })}
        id={"adresse3"}
        label={""}
        size="medium"
        maxLength={34}
        error={errors?.adresse3?.message}
      />
    </>
  );
};

export default AdresseFields;
