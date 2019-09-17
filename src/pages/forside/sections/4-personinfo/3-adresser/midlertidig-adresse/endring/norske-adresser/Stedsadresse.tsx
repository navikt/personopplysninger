import React, { useState } from "react";
import { Tilleggsadresse } from "../../../../../../../../types/adresser/tilleggsadresse";
import { FormContext, FormValidation } from "calidation";
import { postStedsadresse } from "../../../../../../../../clients/apiClient";
import { HTTPError } from "../../../../../../../../components/error/Error";
import { Input } from "nav-frontend-skjema";
import { sjekkForFeil } from "../../../../../../../../utils/validators";
import InputPostnummer from "../../../../../../../../components/felter/input-postnummer/InputPostnummer";
import { Knapp } from "nav-frontend-knapper";
import { FormattedMessage } from "react-intl";
import AlertStripe from "nav-frontend-alertstriper";
import DayPicker from "../../../../../../../../components/felter/day-picker/DayPicker";

interface Props {
  tilleggsadresse: Tilleggsadresse;
  onChangeSuccess: (konto: Tilleggsadresse) => void;
}

export interface OutboundStedsadresse {
  tilleggslinje: string;
  eiendomsnavn: string;
  postnummer: string;
  gyldigTom: string;
}

const OpprettEllerEndreStedsadresse = (props: Props) => {
  const [loading, settLoading] = useState();
  const [alert, settAlert] = useState();

  const initialValues = {
    ...props.tilleggsadresse
  };

  const formConfig = {
    tilleggslinje: {},
    eiendomsnavn: {},
    postnummer: {},
    datoTilOgMed: {}
  };

  const submit = (c: FormContext) => {
    const { isValid, fields } = c;
    if (isValid) {
      const { datoTilOgMed, ...equalFields } = fields;

      const outbound = {
        ...equalFields,
        gyldigTom: datoTilOgMed
      } as OutboundStedsadresse;

      const view = {
        ...fields
      };

      settLoading(true);
      postStedsadresse(outbound)
        .then(() => {
          props.onChangeSuccess(view);
        })
        .catch((error: HTTPError) => {
          settAlert({
            type: "feil",
            melding: `${error.code} - ${error.text}`
          });
        })
        .then(() => {
          settLoading(false);
        });
    }
  };

  return (
    <FormValidation
      onSubmit={submit}
      config={formConfig}
      initialValues={initialValues}
    >
      {({ errors, fields, isValid, submitted, setField, setError }) => {
        return (
          <>
            <div className="addresse__rad">
              <div className="addresse__kolonne">
                <Input
                  label={"Person som eier adressen (valgfri)"}
                  value={fields.tilleggslinje}
                  onChange={e => setField({ tilleggslinje: e.target.value })}
                  bredde={"XXL"}
                  feil={sjekkForFeil(submitted, errors.tilleggslinje)}
                />
              </div>
              <div className="addresse__kolonne" />
            </div>
            <div className="addresse__rad">
              <div className="addresse__kolonne">
                <Input
                  label={"Stedsadresse"}
                  value={fields.eiendomsnavn}
                  onChange={e => setField({ eiendomsnavn: e.target.value })}
                  bredde={"XXL"}
                  feil={sjekkForFeil(submitted, errors.eiendomsnavn)}
                />
              </div>
              <div className="addresse__kolonne" />
            </div>
            <div className="addresse__rad">
              <div className="addresse__kolonne">
                <InputPostnummer
                  label={"Postnummer"}
                  value={fields.postnummer}
                  submitted={submitted}
                  error={errors.postnummer}
                  onChange={postnummer => setField({ postnummer })}
                  onErrors={error => setError({ postnummer: error })}
                />
              </div>
            </div>
            <div className="addresse__rad">
              <div className="addresse__kolonne">
                <DayPicker
                  value={fields.datoTilOgMed}
                  label={"Gyldig til"}
                  submitted={submitted}
                  error={errors.datoTilOgMed}
                  onChange={value => setField({ datoTilOgMed: value })}
                  onErrors={error => setError({ datoTilOgMed: error })}
                />
              </div>
              <div className="addresse__kolonne" />
            </div>
            <div className="addresse__submit-container">
              <Knapp
                type={"hoved"}
                htmlType={"submit"}
                disabled={submitted && !isValid}
                autoDisableVedSpinner={true}
                spinner={loading}
              >
                <FormattedMessage id={"side.lagre"} />
              </Knapp>
            </div>
            {alert && (
              <div className={"tlfnummer__alert"}>
                <AlertStripe type={alert.type}>
                  <span>{alert.melding}</span>
                </AlertStripe>
              </div>
            )}
          </>
        );
      }}
    </FormValidation>
  );
};

export default OpprettEllerEndreStedsadresse;
