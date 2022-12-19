import React from "react";
import { useFormContext } from "react-hook-form";
import { FormFields } from "../../types";
import { useIntlFormatter } from "../../../../../../../../hooks/useIntlFormatter";
import InputMedHjelpetekst from "../../../../../../../../components/felter/input-med-hjelpetekst/InputMedHjelpetekst";

const RetningsnummerField = () => {
  const { formatMessage } = useIntlFormatter();

  const {
    register,
    formState: { errors },
  } = useFormContext<FormFields>();

  return (
    <InputMedHjelpetekst
      {...register("retningsnummer")}
      disabled={true}
      label={formatMessage("felter.bankkode.label")}
      hjelpetekst={"utbetalinger.hjelpetekster.bankkode"}
      error={errors?.retningsnummer?.message}
    />
  );
};

export default RetningsnummerField;
