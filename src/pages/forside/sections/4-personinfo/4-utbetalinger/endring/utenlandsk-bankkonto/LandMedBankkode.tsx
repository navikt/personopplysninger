import React from "react";
import InputMedHjelpetekst from "components/felter/input-med-hjelpetekst/InputMedHjelpetekst";
import { BANKKODE_MAX_LENGTH } from "./UtenlandsBankkonto";
import {
  FormattedHTMLMessage,
  InjectedIntlProps,
  injectIntl
} from "react-intl";
import { Errors, Fields } from "calidation";
import { AlertStripeAdvarsel } from "nav-frontend-alertstriper";

interface Props {
  errors: Errors;
  fields: Fields;
  setField: (delta: Fields) => void;
  submitted: boolean;
}

const LandMedBankkode = (props: Props & InjectedIntlProps) => {
  const { errors, fields, setField, submitted, intl } = props;
  return (
    <>
      <div className="utbetalinger__bic-bankkode">
        <div className="utbetalinger__alert">
          <AlertStripeAdvarsel>
            <FormattedHTMLMessage
              id="felter.landetbrukerbankkode.advarsel"
              values={{ land: fields.land.label.toLowerCase() }}
            />
          </AlertStripeAdvarsel>
        </div>
        <InputMedHjelpetekst
          bredde={"M"}
          maxLength={11}
          submitted={submitted}
          value={fields.bickode}
          hjelpetekst={"utbetalinger.hjelpetekster.bic"}
          label={intl.messages["felter.bic.label"]}
          onChange={value => setField({ bickode: value })}
          error={errors.bickode}
        />
        <div className="utbetalinger__bankkode-rad">
          <div className="utbetalinger__bankkode-kolonne">
            <InputMedHjelpetekst
              disabled={true}
              value={fields.retningsnummer}
              submitted={submitted}
              label={intl.messages["felter.bankkode.label"]}
              error={errors.retningsnummer}
              hjelpetekst={"utbetalinger.hjelpetekster.bankkode"}
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

export default injectIntl(LandMedBankkode);
