import React, { ForwardedRef } from "react";
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

const KontonummerIbanField = React.forwardRef(
  (props: Props, ref: ForwardedRef<any>) => {
    const { formatIntl } = useIntlFormatter();

    const {
      register,
      setValue,
      watch,
      formState: { errors, isSubmitted },
    } = useFormContext<FormFields>();

    return (
      <InputMedHjelpetekst
        {...register("kontonummer", {
          validate: {
            ...(watch().land?.kreverIban && {
              required: (v) => v || formatIntl("validation.iban.pakrevd"),
              validIban: (v) =>
                isValidIBAN(v) || formatIntl("validation.iban.gyldig"),
            }),
            ...(!watch().land?.kreverIban && {
              required: (v) =>
                v || formatIntl("validation.kontonummer.pakrevd"),
            }),
            ...(harValgtUSA(watch().land) && {
              notIban: (v) =>
                !isValidIBAN(v) || formatIntl("validation.ikke.iban"),
            }),
            ...(isValidIBAN(watch().kontonummer) && {
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
        id={"kontonummer"}
        size="medium"
        maxLength={36}
        htmlSize={37}
        submitted={isSubmitted}
        hjelpetekst={"utbetalinger.hjelpetekster.kontonummer"}
        label={formatIntl("felter.kontonummer.kontonummer.label")}
        onChange={(value) => setValue("kontonummer", value)}
        error={errors?.kontonummer?.message}
        ref={ref}
      />
    );
  }
);

export default KontonummerIbanField;
