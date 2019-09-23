import {
  Dictionary,
  FieldConfig,
  SimpleValidator,
  SimpleValidatorConfig,
  ValidatorContext
} from "calidation";
import { isValidIBAN, isValidBIC } from "ibantools";
import { getCountryISO2 } from "../pages/forside/sections/4-personinfo/4-utbetalinger/endring/utils";
import { BANKKODE_MAX_LENGTH } from "../pages/forside/sections/4-personinfo/4-utbetalinger/endring/UtenlandsBankkonto";
import { isMod11 } from "./kontonummer";
import { OptionType } from "../types/option";

/*
  Form validators
 */

export type ExtraFieldsConfig = Dictionary<FieldConfig & ExtraFieldConfig>;
export interface ExtraFieldConfig {
  isBIC?: SimpleValidator;
  isIBAN?: SimpleValidator;
  isIBANCountryCompliant?: SimpleValidator;
  isBankkode?: CustomValidator;
  isMod11?: SimpleValidator;
  isLetters?: SimpleValidator;
  isLettersOrDigits?: SimpleValidator;
  isBlacklistedCommon?: SimpleValidator;
  isValidNorwegianNumber?: SimpleValidator;
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

  isBankkode: (config: CustomValidator, { fields }: ValidatorContext) => (
    value: string
  ) =>
    value && value.length !== BANKKODE_MAX_LENGTH[fields.land.value]
      ? config.message({
          land: fields.land.label,
          siffer: BANKKODE_MAX_LENGTH[fields.land.value]
        })
      : null,

  isMod11: (config: SimpleValidatorConfig) => (value: string) =>
    value && !isMod11(value) ? config.message : null,

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

  isValidNorwegianNumber: (config: SimpleValidatorConfig) => (value: string) =>
    value.length !== 8 || !erInteger(value) ? config.message : null,

  isHouseNumber: (config: SimpleValidatorConfig) => (value: string) =>
    value && !value.match(/([LHUK]{1})([0-9]{4})/) ? config.message : null
};

/*
  Utils
 */

export const erInteger = (str: string) => {
  var n = Math.floor(Number(str));
  return n !== Infinity && String(n) === str && n >= 0;
};

export const sjekkForFeil = (submitted: boolean, error: string | null) =>
  submitted && error ? { feilmelding: error } : undefined;

export const isNorwegianNumber = (landskode: OptionType) =>
  landskode && landskode.value === "+47";

/*
  Overridden types
 */

export type SimpleValidators = Dictionary<
  (config: SimpleValidatorConfig) => (value: any) => string | null
>;

export interface CustomValidator {
  message: (values: object) => string;
  validateIf?: ((context: ValidatorContext) => boolean) | boolean;
}

export type Validators = Dictionary<
  (
    config: SimpleValidatorConfig & CustomValidator,
    context: ValidatorContext
  ) => (value: any) => string | null
>;
