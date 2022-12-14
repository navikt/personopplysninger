import React from "react";
import InputMedHjelpetekst from "components/felter/input-med-hjelpetekst/InputMedHjelpetekst";
import { useFormContext } from "react-hook-form";
import { FormFields } from "../../types";
import { useIntlFormatter } from "../../../../../../../../hooks/useIntlFormatter";
import { isValidIBAN } from "ibantools";
import { harValgtUSA } from "../../utils";
import {
  isIBANCountryCompliant,
  isLettersAndDigits,
} from "../../../../../../../../utils/validators";

interface Props {
  personident?: { verdi: string; type: string };
}

const KontonummerIbanField = (props: Props) => {
  const { formatIntl } = useIntlFormatter();

  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<FormFields>();

  return (
    <InputMedHjelpetekst
      {...register("kontonummerIban", {
        validate: {
          ...(watch().land?.kreverIban && {
            required: (v) => !!v || formatIntl("validation.iban.pakrevd"),
            validIban: (v) =>
              isValidIBAN(v) || formatIntl("validation.iban.gyldig"),
          }),
          ...(!watch().land?.kreverIban && {
            required: (v) =>
              !!v || formatIntl("validation.kontonummer.pakrevd"),
          }),
          ...(harValgtUSA(watch().land) && {
            notIban: (v) =>
              !isValidIBAN(v) || formatIntl("validation.ikke.iban"),
          }),
          ...(isValidIBAN(watch().kontonummerIban) && {
            ibanCountryCompliant: (v) =>
              isIBANCountryCompliant(v, watch().land) ||
              formatIntl("validation.iban.country"),
          }),
          lettersAndDigits: (v) =>
            isLettersAndDigits(v) ||
            formatIntl("validation.only.letters.and.digits"),
          notUsersSsn: (v) =>
            v !== props.personident?.verdi ||
            formatIntl("validation.kontonummer.idnr"),
        },
      })}
      id={"kontonummerIban"}
      size="medium"
      maxLength={36}
      htmlSize={37}
      hjelpetekst={"utbetalinger.hjelpetekster.kontonummer"}
      label={formatIntl("felter.kontonummer.kontonummer.label")}
      error={errors?.kontonummerIban?.message}
    />
  );
};

export default KontonummerIbanField;
