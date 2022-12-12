import React, { ForwardedRef } from "react";
import { useFormContext } from "react-hook-form";
import { FormFields } from "../../types";
import { useIntlFormatter } from "../../../../../../../../hooks/useIntlFormatter";
import InputMedHjelpetekst from "../../../../../../../../components/felter/input-med-hjelpetekst/InputMedHjelpetekst";

const RetningsnummerField = React.forwardRef((_, ref: ForwardedRef<any>) => {
  const { formatIntl } = useIntlFormatter();

  const {
    register,
    setValue,
    formState: { errors, isSubmitted },
  } = useFormContext<FormFields>();

  return (
    <InputMedHjelpetekst
      {...register("retningsnummer")}
      disabled={true}
      submitted={isSubmitted}
      label={formatIntl("felter.bankkode.label")}
      hjelpetekst={"utbetalinger.hjelpetekster.bankkode"}
      error={errors?.retningsnummer?.message}
      onChange={(value) => setValue("retningsnummer", value)}
      ref={ref}
    />
  );
});

export default RetningsnummerField;
