import React from "react";
import InputMedHjelpetekst from "components/felter/input-med-hjelpetekst/InputMedHjelpetekst";
import { BANKKODE_MAX_LENGTH } from "./UtenlandsBankkonto";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { Errors, Fields } from "calidation";

interface Props {
  errors: Errors;
  fields: Fields;
  setField: (delta: Fields) => void;
  submitted: boolean;
}

const AmerikanskKonto = (props: Props & InjectedIntlProps) => {
  const { errors, fields, setField, submitted, intl } = props;
  return (
    <>
      <div className="utbetalinger__bankkode-rad">
        <div className="utbetalinger__bankkode-kolonne">
          <InputMedHjelpetekst
            disabled={true}
            value={fields.retningsnummer}
            submitted={submitted}
            label={intl.messages["felter.bankkode.label"]}
            hjelpetekst={"utbetalinger.hjelpetekster.bankkode"}
            error={errors.retningsnummer}
            onChange={value => setField({ retningsnummer: value })}
          />
        </div>
        <div className="utbetalinger__bankkode-kolonne">
          <InputMedHjelpetekst
            label={``}
            bredde={"M"}
            submitted={submitted}
            value={fields.bankkode}
            error={errors.bankkode}
            onChange={value => setField({ bankkode: value })}
            maxLength={fields.land && BANKKODE_MAX_LENGTH[fields.land.value]}
          />
        </div>
      </div>
      <div className="utbetalinger__adressefelter">
        <InputMedHjelpetekst
          bredde={"L"}
          maxLength={34}
          submitted={submitted}
          value={fields.adresse1}
          onChange={value => setField({ adresse1: value })}
          label={intl.messages["felter.bankens.adresse.label"]}
        />
        <InputMedHjelpetekst
          label={""}
          bredde={"L"}
          maxLength={34}
          value={fields.adresse2}
          submitted={submitted}
          onChange={value => setField({ adresse2: value })}
        />
        <InputMedHjelpetekst
          label={""}
          bredde={"L"}
          maxLength={34}
          value={fields.adresse3}
          submitted={submitted}
          onChange={value => setField({ adresse3: value })}
        />
      </div>
    </>
  );
};

export default injectIntl(AmerikanskKonto);
