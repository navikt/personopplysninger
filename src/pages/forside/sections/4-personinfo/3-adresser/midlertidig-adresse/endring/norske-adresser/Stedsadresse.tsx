import React, { useState } from "react";
import { Tilleggsadresse } from "../../../../../../../../types/adresser/tilleggsadresse";
import { FormContext, FormValidation } from "calidation";
import {
  fetchPersonInfo,
  postStedsadresse
} from "../../../../../../../../clients/apiClient";
import { HTTPError } from "../../../../../../../../components/error/Error";
import { Input } from "nav-frontend-skjema";
import {
  ExtraFieldsConfig,
  sjekkForFeil
} from "../../../../../../../../utils/validators";
import InputPostnummer from "../../../../../../../../components/felter/input-postnummer/InputPostnummer";
import { Knapp } from "nav-frontend-knapper";
import { FormattedMessage } from "react-intl";
import AlertStripe from "nav-frontend-alertstriper";
import DayPicker from "../../../../../../../../components/felter/day-picker/DayPicker";
import { useStore } from "../../../../../../../../providers/Provider";
import { PersonInfo } from "../../../../../../../../types/personInfo";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { dateOneYearAhead } from "../../../../../../../../utils/date";

interface Props {
  tilleggsadresse?: Tilleggsadresse;
  onChangeSuccess: () => void;
}

export interface OutboundStedsadresse {
  tilleggslinje: string;
  eiendomsnavn: string;
  postnummer: string;
  gyldigTom: string;
}

const OpprettEllerEndreStedsadresse = (props: Props & InjectedIntlProps) => {
  const { tilleggsadresse, onChangeSuccess, intl } = props;
  const [loading, settLoading] = useState();
  const [alert, settAlert] = useState();
  const [, dispatch] = useStore();

  const initialValues = {
    datoTilOgMed: dateOneYearAhead,
    ...tilleggsadresse
  };

  const formConfig: ExtraFieldsConfig = {
    tilleggslinje: {},
    eiendomsnavn: {
      isLettersOrDigits: intl.messages["validation.only.letters.and.digits"]
    },
    postnummer: {
      isRequired: intl.messages["validation.postnummer.pakrevd"]
    },
    datoTilOgMed: {
      isRequired: intl.messages["validation.tomdato.pakrevd"]
    }
  };

  const getUpdatedData = () =>
    fetchPersonInfo().then(personInfo => {
      dispatch({
        type: "SETT_PERSON_INFO_RESULT",
        payload: personInfo as PersonInfo
      });
    });

  const submit = (c: FormContext) => {
    const { isValid, fields } = c;
    if (isValid) {
      const { datoTilOgMed, ...equalFields } = fields;

      const outbound = {
        ...equalFields,
        gyldigTom: datoTilOgMed
      } as OutboundStedsadresse;

      settLoading(true);
      postStedsadresse(outbound)
        .then(getUpdatedData)
        .then(onChangeSuccess)
        .catch((error: HTTPError) => {
          settLoading(false);
          settAlert({
            type: "feil",
            melding: `${error.code} - ${error.text}`
          });
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
            <div className="adresse__rad">
              <div className="adresse__kolonne">
                <Input
                  bredde={"XXL"}
                  maxLength={30}
                  value={fields.tilleggslinje}
                  label={intl.messages["felter.tillegslinje.label"]}
                  placeholder={intl.messages["felter.tillegslinje.placeholder"]}
                  onChange={e => setField({ tilleggslinje: e.target.value })}
                  feil={sjekkForFeil(submitted, errors.tilleggslinje)}
                />
              </div>
              <div className="adresse__kolonne" />
            </div>
            <div className="adresse__rad">
              <div className="adresse__kolonne">
                <Input
                  bredde={"XXL"}
                  value={fields.eiendomsnavn}
                  label={intl.messages["felter.stedsadresse.label"]}
                  onChange={e => setField({ eiendomsnavn: e.target.value })}
                  feil={sjekkForFeil(submitted, errors.eiendomsnavn)}
                />
              </div>
              <div className="adresse__kolonne" />
            </div>
            <div className="adresse__rad">
              <div className="adresse__kolonne">
                <InputPostnummer
                  submitted={submitted}
                  value={fields.postnummer}
                  error={errors.postnummer}
                  label={intl.messages["felter.postnummer.label"]}
                  onChange={postnummer => setField({ postnummer })}
                  onErrors={error => setError({ postnummer: error })}
                />
              </div>
              <div className="adresse__kolonne" />
            </div>
            <div className="adresse__rad">
              <div className="adresse__kolonne">
                <DayPicker
                  submitted={submitted}
                  value={fields.datoTilOgMed}
                  error={errors.datoTilOgMed}
                  label={intl.messages["felter.gyldigtom.label"]}
                  ugyldigTekst={intl.messages["validation.tomdato.ugyldig"]}
                  onChange={value => setField({ datoTilOgMed: value })}
                  onErrors={error => setError({ datoTilOgMed: error })}
                />
              </div>
              <div className="adresse__kolonne" />
            </div>
            <div className="adresse__submit-container">
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

export default injectIntl(OpprettEllerEndreStedsadresse);
