import { SimpleValidatorConfig, ValidatorContext } from "calidation";
import { isValidBIC, isValidIBAN } from "ibantools";
import {
  getCountryAlpha2,
  getIbanPrefixAlternatives,
} from "pages/forside/sections/4-personinfo/4-utbetalinger/endring/utils";
import { BANKKODE_MAX_LENGTH } from "pages/forside/sections/4-personinfo/4-utbetalinger/endring/utenlandsk-bankkonto/UtenlandsBankkonto";
import { isMod11 } from "./kontonummer";
import { OptionType } from "types/option";
import validator from "@navikt/fnrvalidator";
import { normalizeNummer } from "./formattering";

export const extraValidators = {
  /*
    General validators
   */

  isNormalizedLength: (config: SimpleValidatorConfig) => (value: string) =>
    value && normalizeNummer(value).length !== 11 ? config.message : null,

  isMod11: (config: SimpleValidatorConfig) => (value: string) =>
    value && !isMod11(normalizeNummer(value)) ? config.message : null,

  isFirstCharNotSpace: (config: SimpleValidatorConfig) => (value: string) =>
    value && !value.match(/^[^\s].*/) ? config.message : null,

  // Todo: use regExpCreator
  isLetters: (config: SimpleValidatorConfig) => (value: string) =>
    value.match(/[^ÆØÅæøåA-Za-z]+/g) ? config.message : null,

  // Todo: use regExpCreator
  isLettersAndSpace: (config: SimpleValidatorConfig) => (value: string) =>
    value.match(/[^ÆØÅæøåA-Za-z ]+/g) ? config.message : null,

  // Todo: use regExpCreator
  isLettersAndDigits: (config: SimpleValidatorConfig) => (value: string) =>
    value.match(/[^ÆØÅæøåA-Za-z0-9]+/g) ? config.message : null,

  // Todo: use regExpCreator
  isLettersSpaceAndDigits: (config: SimpleValidatorConfig) => (value: string) =>
    value.match(/[^ÆØÅæøåA-Za-z0-9 ]+/g) ? config.message : null,

  // Todo: use regExpCreator
  isMinOneLetter: (config: SimpleValidatorConfig) => (value: string) =>
    !value.match(/[[ÆØÅæøåA-z]+/g) ? config.message : null,

  isBlacklistedCommon: (config: SimpleValidatorConfig) => (value: string) =>
    BLACKLISTED_WORDS.some((substring) =>
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

  isNotSSN: (config: SimpleValidatorConfig) => (value: string) =>
    validator.idnr(value).status === "valid" ? config.message : null,

  isNotYourSSN: (config: SimpleValidatorConfig) => () => config.message,

  /*
    Special validators - Address
  */

  isHouseNumber: (config: SimpleValidatorConfig) => (value: string) =>
    value && !value.match(/([LHUK]{1})([0-9]{4})/) ? config.message : null,

  // Todo: use regExpCreator
  isValidStreetName: (config: SimpleValidatorConfig) => (value: string) =>
    value.match(/[^ÆØÅæøåA-Za-z _.-]+/g) ? config.message : null,

  /*
    Special validators - Account number
   */

  isValidNorwegianNumber: (config: SimpleValidatorConfig) => (value: string) =>
    value.length !== 8 || !erInteger(value) ? config.message : null,

  isIBANRequired: (config: SimpleValidatorConfig) => (value: OptionType) =>
    !value ? config.message : null,

  isIBAN: (config: SimpleValidatorConfig) => (value: string) =>
    !isValidIBAN(value) ? config.message : null,

  isIBANCountryCompliant:
    (config: SimpleValidatorConfig, { fields }: ValidatorContext) =>
    (value: string) => {
      if (!fields.land) {
        return null;
      }
      const ibanPrefix = value && value.substring(0, 2);
      const selectedCountryAlpha2 = getCountryAlpha2(fields.land.value);
      const selectedCountryPrefixAlternatives = getIbanPrefixAlternatives(
        fields.land.value
      );

      return ibanPrefix !== selectedCountryAlpha2 &&
        !selectedCountryPrefixAlternatives.includes(ibanPrefix)
        ? config.message
        : null;
    },

  isBIC: (config: SimpleValidatorConfig) => (value: string) =>
    !isValidBIC(value) ? config.message : null,

  isBICCountryCompliant:
    (config: SimpleValidatorConfig, { fields }: ValidatorContext) =>
    (value: string) =>
      fields.land &&
      value.substring(4, 6) !== getCountryAlpha2(fields.land.value)
        ? config.message
        : null,

  isNotIBAN: (config: SimpleValidatorConfig) => (value: string) =>
    isValidIBAN(value) ? config.message : null,

  isBankkode:
    (config: any, { fields }: ValidatorContext) =>
    (value: string) =>
      value && value.length !== BANKKODE_MAX_LENGTH[fields.land.value]
        ? config.message({
            land: fields.land.label,
            siffer: BANKKODE_MAX_LENGTH[fields.land.value],
          })
        : null,

  hasMultipleCombinedSpaces:
    (config: SimpleValidatorConfig) => (value: string) =>
      value && value.match(/\s\s/) ? config.message : null,

  notOnlySignsDigitsSpace: (config: SimpleValidatorConfig) => (value: string) =>
    value && normalizeInput(value).match(regExpPattern.onlyNonLetters)
      ? config.message
      : null,

  notOnlySignsSpace: (config: SimpleValidatorConfig) => (value: string) =>
    value && normalizeInput(value).match(regExpPattern.onlySignsSpace)
      ? config.message
      : null,

  isValidBanknavn: (config: SimpleValidatorConfig) => (value: string) =>
    value && !normalizeInput(value).match(regExpPattern.validBanknavn)
      ? config.message
      : null,

  isValidAdresselinje: (config: SimpleValidatorConfig) => (value: string) =>
    value && !normalizeInput(value).match(regExpPattern.validBankadresselinje)
      ? config.message
      : null,
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

/*
  Regex
 */

const LATIN_LETTERS = "A-Za-z";
const NORWEGIAN_LETTERS = LATIN_LETTERS + "ÆØÅæøå";
const SPECIAL_LETTERS = `ıłŁŊŋŦŧƁɓƊɗƓɠƘƙƤƥƬƭÞþßԈБ\\u0189\\u0256\\u00D0\\u00F0\\u00F0\\u0111\\u01E4\\u01E5\\u0187\\u0188\\u01B3\\u01B4`;
const ALL_LETTERS = NORWEGIAN_LETTERS + SPECIAL_LETTERS;
const DIGITS = "0-9";
const SPACE = " ";
const HYPHEN = "\\-";
const PERIOD = ".";
const APOSTROPHE = "'";
const FORWARD_SLASH = "/";
const COMMA = ",";
const COLON = ":";
const NUMBER_SIGN = "#";
const AMPERSAND = "&";

export const regExpCreator = (regExpAsArray: string[], flag = "i"): RegExp =>
  new RegExp(regExpAsArray.join(""), flag);

export const regExpPattern = {
  onlyNonLetters: regExpCreator(["^[^", ALL_LETTERS, "]+$"]),
  onlySignsSpace: regExpCreator(["^[^", ALL_LETTERS, DIGITS, "]+$"]),
  validBankadresselinje: regExpCreator([
    "^[",
    ALL_LETTERS,
    DIGITS,
    SPACE,
    HYPHEN,
    PERIOD,
    COMMA,
    COLON,
    APOSTROPHE,
    FORWARD_SLASH,
    AMPERSAND,
    NUMBER_SIGN,
    "]+$",
  ]),
  validBanknavn: regExpCreator([
    "^[",
    ALL_LETTERS,
    DIGITS,
    SPACE,
    HYPHEN,
    PERIOD,
    COMMA,
    APOSTROPHE,
    FORWARD_SLASH,
    AMPERSAND,
    "]+$",
  ]),
};

export const BLACKLISTED_WORDS = [
  "ukjent",
  "ikke kjent",
  "vet ikke",
  "uoppgitt",
  "n.n.",
  "nomen nescio",
];

/*
 * Normalize-funksjonen vil først dekomponere en bokstav med spesialtegn til flere kodepunkter.
 * F.eks. dekomponering av bokstaven Ç (\u00C7) vil resultere i kodepunktene \u0043 (C) og \u0327 (diakritisk tegn)
 * Deretter vil kodepunkter for diakritiske tegn strippes vekk. Man sitter da igjen med kun "base"-versjonen av bokstaven.
 * F.eks. i stringen \u0043\u0327 vil \u0327 bli gjenkjent som et diakritisk tegn og dermed strippes vekk.
 */
const normalizeInput = (val: string): string => {
  const dekomponert = val.normalize("NFD");
  const utenDiakritiskeTegn = dekomponert.replace(/[\u0300-\u036f]/g, "");
  return utenDiakritiskeTegn;
};
