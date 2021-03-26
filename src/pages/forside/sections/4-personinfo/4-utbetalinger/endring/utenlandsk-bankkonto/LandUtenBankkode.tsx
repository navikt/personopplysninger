import React from "react";
import InputMedHjelpetekst from "components/felter/input-med-hjelpetekst/InputMedHjelpetekst";
import { useIntl } from "react-intl";
import { Errors, Fields } from "calidation";

interface Props {
  errors: Errors;
  fields: Fields;
  setField: (delta: Fields) => void;
  submitted: boolean;
}

const LandUtenBankkode = (props: Props) => {
  const { formatMessage: msg } = useIntl();
  const { errors, fields, setField, submitted } = props;
  return (
    <div className="utbetalinger__bank-identifier">
      <InputMedHjelpetekst
        bredde={"M"}
        maxLength={11}
        submitted={submitted}
        value={fields.bickode}
        hjelpetekst={"utbetalinger.hjelpetekster.bic"}
        label={msg({ id: "felter.bic.label" })}
        onChange={(value) => setField({ bickode: value })}
        error={errors.bickode}
      />
    </div>
  );
};

export default LandUtenBankkode;
