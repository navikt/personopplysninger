import { SimpleValidatorConfig, ValidatorContext } from "calidation";
import { isValidIBAN, isValidBIC } from "ibantools";

export const erInteger = (str: string) => {
  var n = Math.floor(Number(str));
  return n !== Infinity && String(n) === str && n >= 0;
};

export const extraValidators = {
  isBIC: (config: SimpleValidatorConfig) => (value: string) =>
    !isValidBIC(value) ? config.message : null,
  isIBAN: (config: SimpleValidatorConfig) => (value: string) =>
    !isValidIBAN(value) ? config.message : null,
  isLetters: (config: SimpleValidatorConfig) => (value: string) =>
    value.match(/[^ÆØÅæøåA-Za-z ]+/g) ? config.message : null,
  isLettersOrDigits: (config: SimpleValidatorConfig) => (value: string) =>
    value.match(/[^ÆØÅæøåA-Za-z0-9 ]+/g) ? config.message : null,
  isNorwegianTelephoneNumber: (
    config: SimpleValidatorConfig,
    { fields }: ValidatorContext
  ) => (value: any) =>
    fields.landskode &&
    fields.landskode.value === "+47" &&
    (value.length !== 8 || !erInteger(value))
      ? config.message
      : null
} as any;

export const blacklistedWords = {
  message: `Kan ikke inneholde ord som "ukjent" og "vet ikke"`,
  blacklist: ["ukjent", "vet ikke"]
};

export const sjekkForFeil = (submitted: boolean, error: string | null) =>
  submitted && error ? { feilmelding: error } : undefined;
