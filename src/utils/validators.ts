import { SimpleValidatorConfig, ValidatorContext } from "calidation";
import { isValidIBAN, isValidBIC } from "ibantools";
import { getCountryISO2 } from "pages/forside/sections/4-personinfo/4-utbetalinger/endring/utils";
import { BIC } from "pages/forside/sections/4-personinfo/4-utbetalinger/endring/utenlandsk-bankkonto/UtenlandsBankkonto";
import { BANKKODE_MAX_LENGTH } from "pages/forside/sections/4-personinfo/4-utbetalinger/endring/utenlandsk-bankkonto/UtenlandsBankkonto";
import { isMod11 } from "./kontonummer";
import { OptionType } from "types/option";
import validator from "@navikt/fnrvalidator";

export const extraValidators = {
  /*
    General validators
   */

  isMod11: (config: SimpleValidatorConfig) => (value: string) =>
    value && !isMod11(value) ? config.message : null,

  isFirstCharNotSpace: (config: SimpleValidatorConfig) => (value: string) =>
    !value.match(/^[^\s].*/) ? config.message : null,

  isLetters: (config: SimpleValidatorConfig) => (value: string) =>
    value.match(/[^ÆØÅæøåA-Za-z]+/g) ? config.message : null,

  isLettersAndSpace: (config: SimpleValidatorConfig) => (value: string) =>
    value.match(/[^ÆØÅæøåA-Za-z ]+/g) ? config.message : null,

  isLettersAndDigits: (config: SimpleValidatorConfig) => (value: string) =>
    value.match(/[^ÆØÅæøåA-Za-z0-9]+/g) ? config.message : null,

  isLettersSpaceAndDigits: (config: SimpleValidatorConfig) => (value: string) =>
    value.match(/[^ÆØÅæøåA-Za-z0-9 ]+/g) ? config.message : null,

  isMinOneLetter: (config: SimpleValidatorConfig) => (value: string) =>
    !value.match(/[[ÆØÅæøåA-z]+/g) ? config.message : null,

  isValidStreetName: (config: SimpleValidatorConfig) => (value: string) =>
    value.match(/[^ÆØÅæøåA-Za-z _.-]+/g) ? config.message : null,

  isBlacklistedCommon: (config: SimpleValidatorConfig) => (value: string) =>
    ["ukjent", "vet ikke"].some((substring) =>
      value.toLowerCase().includes(substring)
    )
      ? config.message
      : null,

  isPositive: (config: SimpleValidatorConfig) => (value: string) => {
    var n = Math.floor(Number(value));
    return !(n !== Infinity && String(n) === value && n > 0)
      ? config.message
      : null;
  },

  /*
    Special validators
  */

  isBIC: (config: SimpleValidatorConfig) => (value: string) =>
    !isValidBIC(value) ? config.message : null,

  isBICCountryCompliant: (
    config: SimpleValidatorConfig,
    { fields }: ValidatorContext
  ) => (value: string) =>
    fields.land && value.substring(4, 6) !== getCountryISO2(fields.land.value)
      ? config.message
      : null,

  isIBAN: (config: SimpleValidatorConfig) => (value: string) =>
    !isValidIBAN(value) ? config.message : null,

  isValidBankIdentifier: (
    config: SimpleValidatorConfig,
    { fields }: ValidatorContext
  ) => (value: string) =>
    isValidIBAN(fields.kontonummer) && value !== BIC ? config.message : null,

  isNotSSN: (config: SimpleValidatorConfig) => (value: string) =>
    validator.idnr(value).status === "valid" ? config.message : null,

  isNotYourSSN: (config: SimpleValidatorConfig) => () => config.message,

  isIBANCountryCompliant: (
    config: SimpleValidatorConfig,
    { fields }: ValidatorContext
  ) => (value: string) =>
    fields.land && value.substring(0, 2) !== getCountryISO2(fields.land.value)
      ? config.message
      : null,

  isNotIBAN: (config: SimpleValidatorConfig) => (value: string) =>
    isValidIBAN(value) ? config.message : null,

  isBankkode: (config: any, { fields }: ValidatorContext) => (value: string) =>
    value && value.length !== BANKKODE_MAX_LENGTH[fields.land.value]
      ? config.message({
          land: fields.land.label,
          siffer: BANKKODE_MAX_LENGTH[fields.land.value],
        })
      : null,

  isValidNorwegianNumber: (config: SimpleValidatorConfig) => (value: string) =>
    value.length !== 8 || !erInteger(value) ? config.message : null,

  isHouseNumber: (config: SimpleValidatorConfig) => (value: string) =>
    value && !value.match(/([LHUK]{1})([0-9]{4})/) ? config.message : null,
};

/*
  Utils
 */

export const erInteger = (str: string) => {
  var n = Math.floor(Number(str));
  return n !== Infinity && String(n) === str && n >= 0;
};

export const isNorwegianNumber = (landskode: OptionType) =>
  landskode && landskode.value === "+47";

export interface CustomValidator {
  message: (values: object) => string;
  validateIf?: ((context: ValidatorContext) => boolean) | boolean;
}
