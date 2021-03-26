import React from "react";
import InputMedHjelpetekst from "components/felter/input-med-hjelpetekst/InputMedHjelpetekst";
import { BANKKODE_MAX_LENGTH } from "./UtenlandsBankkonto";
import { useIntl } from "react-intl";
import { Errors, Fields } from "calidation";

interface Props {
  errors: Errors;
  fields: Fields;
  setField: (delta: Fields) => void;
  submitted: boolean;
}

const AmerikanskKonto = (props: Props) => {
  const { formatMessage: msg } = useIntl();
  const { errors, fields, setField, submitted } = props;
  return (
    <>
      <div className="utbetalinger__bankkode-rad">
        <div className="utbetalinger__bankkode-kolonne">
          <InputMedHjelpetekst
            disabled={true}
            value={fields.retningsnummer}
            submitted={submitted}
            label={msg({ id: "felter.bankkode.label" })}
            hjelpetekst={"utbetalinger.hjelpetekster.bankkode"}
            error={errors.retningsnummer}
            onChange={(value) => setField({ retningsnummer: value })}
          />
        </div>
        <div className="utbetalinger__bankkode-kolonne">
          <InputMedHjelpetekst
            id={"bankkode"}
            label={``}
            bredde={"M"}
            submitted={submitted}
            value={fields.bankkode}
            error={errors.bankkode}
            onChange={(value) => setField({ bankkode: value })}
            maxLength={fields.land && BANKKODE_MAX_LENGTH[fields.land.value]}
          />
        </div>
      </div>
      <div className="utbetalinger__adressefelter">
        <InputMedHjelpetekst
          id={"adresse1"}
          bredde={"L"}
          maxLength={34}
          value={fields.adresse1}
          error={errors.adresse1}
          submitted={submitted}
          onChange={(value) => setField({ adresse1: value })}
          label={msg({ id: "felter.bankens.adresse.label" })}
        />
        <InputMedHjelpetekst
          id={"adresse2"}
          label={""}
          bredde={"L"}
          maxLength={34}
          value={fields.adresse2}
          error={errors.adresse2}
          submitted={submitted}
          onChange={(value) => setField({ adresse2: value })}
        />
        <InputMedHjelpetekst
          id={"adresse3"}
          label={""}
          bredde={"L"}
          maxLength={34}
          value={fields.adresse3}
          error={errors.adresse3}
          submitted={submitted}
          onChange={(value) => setField({ adresse3: value })}
        />
      </div>
    </>
  );
};

export default AmerikanskKonto;
