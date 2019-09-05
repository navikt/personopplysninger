import { SimpleValidatorConfig, ValidatorContext } from "calidation";
import { isValidIBAN, isValidBIC } from "ibantools";

export const extraValidators = {
  isNorwegianTelephoneNumber: (
    config: SimpleValidatorConfig,
    { fields }: ValidatorContext
  ) => (value: any) =>
    fields.landskode === "+47" && value.length !== 8 ? config.message : null,
  isBIC: (config: SimpleValidatorConfig) => (value: string) =>
    !isValidBIC(value) ? config.message : null,
  isIBAN: (config: SimpleValidatorConfig) => (value: string) =>
    !isValidIBAN(value) ? config.message : null
} as any;
