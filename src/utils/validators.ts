import {
  Dictionary,
  FieldConfig,
  SimpleValidator,
  SimpleValidatorConfig,
  ValidatorContext
} from "calidation";
import { isValidIBAN, isValidBIC } from "ibantools";
import { getCountryISO2 } from "../pages/forside/sections/4-personinfo/5-utbetalinger/endring/utils";

/*
  Form validators
 */

export type ExtraFieldsConfig = Dictionary<FieldConfig & ExtraFieldConfig>;
export interface ExtraFieldConfig {
  isBIC?: SimpleValidator;
  isIBAN?: SimpleValidator;
  isIBANCountryCompliant?: SimpleValidator;
  isLetters?: SimpleValidator;
  isLettersOrDigits?: SimpleValidator;
  isBlacklistedCommon?: SimpleValidator;
  isNorwegianTelephoneNumber?: SimpleValidator;
  isHouseNumber?: SimpleValidator;
}

export const extraValidators: Validators = {
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

  isIBANCountryCompliant: (
    config: SimpleValidatorConfig,
    { fields }: ValidatorContext
  ) => (value: string) =>
    fields.land && value.substring(0, 2) !== getCountryISO2(fields.land.value)
      ? config.message
      : null,

  isNotIBAN: (config: SimpleValidatorConfig) => (value: string) =>
    isValidIBAN(value) ? config.message : null,

  isLetters: (config: SimpleValidatorConfig) => (value: string) =>
    value.match(/[^ÆØÅæøåA-Za-z ]+/g) ? config.message : null,

  isLettersOrDigits: (config: SimpleValidatorConfig) => (value: string) =>
    value.match(/[^ÆØÅæøåA-Za-z0-9 ]+/g) ? config.message : null,

  isBlacklistedCommon: (config: SimpleValidatorConfig) => (value: string) =>
    ["ukjent", "vet ikke"].some(substring =>
      value.toLowerCase().includes(substring)
    )
      ? config.message
      : null,

  isNorwegianTelephoneNumber: (config: SimpleValidatorConfig) => (
    value: string
  ) => (value.length !== 8 || !erInteger(value) ? config.message : null),

  isHouseNumber: (config: SimpleValidatorConfig) => (value: string) =>
    value && !value.match(/([LHUK]{1})([0-9]{4})/) ? config.message : null
} as any;

/*
  Utils
 */

export const erInteger = (str: string) => {
  var n = Math.floor(Number(str));
  return n !== Infinity && String(n) === str && n >= 0;
};

export const sjekkForFeil = (submitted: boolean, error: string | null) =>
  submitted && error ? { feilmelding: error } : undefined;

/*
  Overridden types
 */
export type SimpleValidators = Dictionary<
  (config: SimpleValidatorConfig) => (value: any) => string | null
>;

export type Validators = Dictionary<
  (
    config: SimpleValidatorConfig,
    context: ValidatorContext
  ) => (value: any) => string | null
>;
