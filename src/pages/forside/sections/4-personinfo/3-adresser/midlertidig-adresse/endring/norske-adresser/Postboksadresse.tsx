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
import { RADIX_DECIMAL } from "utils/formattering";
import Alert, { AlertType } from "components/alert/Alert";
import InputMedHjelpetekst from "../../../../../../../../components/felter/input-med-hjelpetekst/InputMedHjelpetekst";

interface Props {
  tilleggsadresse?: Tilleggsadresse;
  settOpprettEllerEndre: (opprettEllerEndre: boolean) => void;
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
  const { tilleggsadresse, settOpprettEllerEndre, intl } = props;
  const [alert, settAlert] = useState<AlertType | undefined>();
  const [loading, settLoading] = useState();
  const [, dispatch] = useStore();

  const initialValues = {
    ...(tilleggsadresse && {
      ...tilleggsadresse,
      ...(tilleggsadresse.postboksnummer && {
        postboksnummer: parseInt(tilleggsadresse.postboksnummer, RADIX_DECIMAL)
      })
    })
  };

  const formConfig: ExtraFieldsConfig = {
    tilleggslinje: {
      isBlacklistedCommon: intl.messages["validation.svarteliste.felles"],
      isFirstCharNotSpace: intl.messages["validation.firstchar.notspace"]
    },
    postboksnummer: {
      isRequired: intl.messages["validation.postboksnummer.pakrevd"],
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

  const onSuccess = () => {
    settOpprettEllerEndre(false);
  };

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
          tilleggslinjeType: "CO",
          tilleggslinje
        })
      } as OutboundPostboksadresse;

      settLoading(true);
      postPostboksadresse(outbound)
        .then(getUpdatedData)
        .then(onSuccess)
        .catch((error: AlertType) => settAlert(error))
        .then(() => settLoading(false));
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
            <InputMedHjelpetekst
              bredde={"L"}
              maxLength={26}
              submitted={submitted}
              hjelpetekst={"adresse.hjelpetekster.co"}
              label={intl.messages["felter.tillegslinje.label"]}
              placeholder={intl.messages["felter.tillegslinje.placeholder"]}
              onChange={value => setField({ tilleggslinje: value })}
              value={fields.tilleggslinje}
              error={errors.tilleggslinje}
            />
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
            <div className="adresse__form-knapper">
              <div className="adresse__knapp">
                <Knapp
                  type={"standard"}
                  htmlType={"submit"}
                  disabled={submitted && !isValid}
                  autoDisableVedSpinner={true}
                  spinner={loading}
                >
                  <FormattedMessage id={"side.lagre"} />
                </Knapp>
              </div>
              <div className="adresse__knapp">
                <Knapp
                  type={"flat"}
                  htmlType={"button"}
                  disabled={loading}
                  onClick={() => settOpprettEllerEndre(false)}
                >
                  <FormattedMessage id={"side.avbryt"} />
                </Knapp>
              </div>
            </div>
            {alert && <Alert {...alert} />}
          </>
        );
      }}
    </FormValidation>
  );
};

export default injectIntl(OpprettEllerEndrePostboksadresse);
