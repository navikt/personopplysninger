import React, { useState } from "react";
import { Tilleggsadresse } from "types/adresser/tilleggsadresse";
import { Input } from "nav-frontend-skjema";
import { ExtraFieldsConfig, sjekkForFeil } from "utils/validators";
import InputPostnummer from "components/felter/input-postnummer/InputPostnummer";
import DayPicker from "components/felter/day-picker/DayPicker";
import { Knapp } from "nav-frontend-knapper";
import { FormattedMessage } from "react-intl";
import { FormContext, FormValidation } from "calidation";
import { fetchPersonInfo, postPostboksadresse } from "clients/apiClient";
import { PersonInfo } from "types/personInfo";
import { useStore } from "providers/Provider";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { oneYearAhead } from "utils/date";
import { RADIX_DECIMAL } from "utils/formattering";
import Alert, { AlertType } from "components/alert/Alert";

interface Props {
  tilleggsadresse?: Tilleggsadresse;
  onChangeSuccess: () => void;
}

export interface OutboundPostboksadresse {
  tilleggslinje: string;
  tilleggslinjeType: string;
  postboksnummer: number;
  postboksanlegg: string;
  postnummer: string;
  gyldigTom: string;
}

const OpprettEllerEndrePostboksadresse = (props: Props & InjectedIntlProps) => {
  const { tilleggsadresse, onChangeSuccess, intl } = props;
  const [alert, settAlert] = useState<AlertType | undefined>();
  const [loading, settLoading] = useState();
  const [, dispatch] = useStore();

  const initialValues = {
    datoTilOgMed: oneYearAhead,
    ...tilleggsadresse
  };

  const formConfig: ExtraFieldsConfig = {
    tilleggslinje: {
      isBlacklistedCommon: intl.messages["validation.svarteliste.felles"]
    },
    postboksnummer: {
      isBlacklistedCommon: intl.messages["validation.svarteliste.felles"],
      isNumber: intl.messages["validation.only.digits"]
    },
    postboksanlegg: {
      isBlacklistedCommon: intl.messages["validation.svarteliste.felles"],
      isLettersOrDigits: intl.messages["validation.only.letters.and.digits"]
    },
    postnummer: {
      isRequired: intl.messages["validation.postnummer.pakrevd"],
      isNumber: intl.messages["validation.only.digits"]
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
      const {
        datoTilOgMed,
        postboksnummer,
        tilleggslinje,
        ...equalFields
      } = fields;

      const outbound = {
        ...equalFields,
        postboksnummer: parseInt(postboksnummer, RADIX_DECIMAL),
        gyldigTom: datoTilOgMed,
        ...(tilleggslinje && {
          tilleggslinjeType: "C/O",
          tilleggslinje
        })
      } as OutboundPostboksadresse;

      settLoading(true);
      postPostboksadresse(outbound)
        .then(getUpdatedData)
        .then(onChangeSuccess)
        .catch((alert: AlertType) => {
          settLoading(false);
          settAlert(alert);
        });
    }
  };

  return (
    <FormValidation
      onSubmit={submit}
      config={formConfig}
      initialValues={initialValues}
    >
      {({ errors, fields, submitted, isValid, setField, setError }) => {
        return (
          <>
            <div className="adresse__rad">
              <div className="adresse__kolonne">
                <Input
                  bredde={"XXL"}
                  maxLength={30}
                  label={intl.messages["felter.tillegslinje.label"]}
                  placeholder={intl.messages["felter.tillegslinje.placeholder"]}
                  value={fields.tilleggslinje}
                  onChange={e => setField({ tilleggslinje: e.target.value })}
                  feil={sjekkForFeil(submitted, errors.tilleggslinje)}
                />
              </div>
              <div className="adresse__kolonne" />
            </div>
            <div className="adresse__rad">
              <Input
                min={1}
                bredde={"S"}
                type={"number"}
                label={intl.messages["felter.postboksnummer.label"]}
                value={fields.postboksnummer}
                className="adresse__input-avstand"
                feil={sjekkForFeil(submitted, errors.postboksnummer)}
                onChange={({ target }) => {
                  if (target.value.length <= 4) {
                    setField({ postboksnummer: target.value });
                  }
                }}
              />
              <Input
                bredde={"M"}
                maxLength={30}
                value={fields.postboksanlegg}
                label={intl.messages["felter.postboksanlegg.label"]}
                onChange={e => setField({ postboksanlegg: e.target.value })}
                className="adresse__input-avstand"
                feil={sjekkForFeil(submitted, errors.postboksanlegg)}
              />
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
            {alert && <Alert {...alert} />}
          </>
        );
      }}
    </FormValidation>
  );
};

export default injectIntl(OpprettEllerEndrePostboksadresse);
