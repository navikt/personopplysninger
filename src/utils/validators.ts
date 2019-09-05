import { SimpleValidatorConfig, ValidatorContext } from "calidation";

export const extraValidators = {
  norwegianNumberIsValid: (
    config: SimpleValidatorConfig,
    { fields }: ValidatorContext
  ) => (value: any) =>
    fields.landskode === "+47" && value.length !== 8 ? config.message : null
} as any;
