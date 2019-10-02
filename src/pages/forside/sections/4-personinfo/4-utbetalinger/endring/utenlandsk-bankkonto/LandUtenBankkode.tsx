import React from "react";
import InputMedHjelpetekst from "components/felter/input-med-hjelpetekst/InputMedHjelpetekst";
import { BIC, HVERKEN_BANKKODE_BIC } from "./UtenlandsBankkonto";
import { FormattedMessage, InjectedIntlProps, injectIntl } from "react-intl";
import { Errors, Fields } from "calidation";
import { AlertStripeAdvarsel } from "nav-frontend-alertstriper";
import { Radio, SkjemaGruppe } from "nav-frontend-skjema";
import { sjekkForFeil } from "utils/validators";
import { harValgtBic } from "../utils";

interface Props {
  errors: Errors;
  fields: Fields;
  setField: (delta: Fields) => void;
  submitted: boolean;
}

const LandUtenBankkode = (props: Props & InjectedIntlProps) => {
  const { errors, fields, setField, submitted, intl } = props;
  return (
    <div className="utbetalinger__bank-identifier">
      <SkjemaGruppe feil={sjekkForFeil(submitted, errors.bankidentifier)}>
        <Radio
          name={BIC}
          checked={fields.bankidentifier === BIC}
          label={intl.messages["felter.bankidentifier.bic"]}
          onChange={e => setField({ bankidentifier: e.target.name })}
        />
        {harValgtBic(fields.bankidentifier) && (
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
        )}
        <Radio
          name={HVERKEN_BANKKODE_BIC}
          checked={fields.bankidentifier === HVERKEN_BANKKODE_BIC}
          label={intl.messages["felter.bankidentifier.harikke.bic"]}
          onChange={e => setField({ bankidentifier: e.target.name })}
        />
      </SkjemaGruppe>
      {fields.bankidentifier === HVERKEN_BANKKODE_BIC && (
        <div className="utbetalinger__alert">
          <AlertStripeAdvarsel>
            <FormattedMessage id="felter.bankidentifier.harikke.bic.advarsel" />
          </AlertStripeAdvarsel>
        </div>
      )}
      {fields.bankidentifier && fields.bankidentifier !== BIC && (
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
      )}
    </div>
  );
};

export default injectIntl(LandUtenBankkode);
