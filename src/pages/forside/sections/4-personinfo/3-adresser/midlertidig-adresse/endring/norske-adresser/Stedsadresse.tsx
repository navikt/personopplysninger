import React, { useState } from "react";
import { Tilleggsadresse } from "types/adresser/tilleggsadresse";
import { FormContext, FormValidation } from "calidation";
import { fetchPersonInfo, postStedsadresse } from "clients/apiClient";
import { Input } from "nav-frontend-skjema";
import { sjekkForFeil } from "utils/validators";
import InputPostnummer from "components/felter/input-postnummer/InputPostnummer";
import { Knapp } from "nav-frontend-knapper";
import { FormattedMessage } from "react-intl";
import DayPicker from "components/felter/day-picker/DayPicker";
import { useStore } from "store/Context";
import { PersonInfo } from "types/personInfo";
import { useIntl } from "react-intl";
import Alert, { AlertType } from "components/alert/Alert";
import InputMedHjelpetekst from "components/felter/input-med-hjelpetekst/InputMedHjelpetekst";

interface Props {
  tilleggsadresse?: Tilleggsadresse;
  settOpprettEllerEndre: (opprettEllerEndre: boolean) => void;
}

interface FormFields {
  tilleggslinje?: string;
  eiendomsnavn?: string;
  postnummer?: string;
  datoTilOgMed?: string;
}

export interface OutboundStedsadresse {
  tilleggslinje: string;
  tilleggslinjeType: string;
  eiendomsnavn: string;
  postnummer: string;
  gyldigTom: string;
}

const OpprettEllerEndreStedsadresse = (props: Props) => {
  const { formatMessage: msg } = useIntl();
  const { tilleggsadresse, settOpprettEllerEndre } = props;
  const [alert, settAlert] = useState<AlertType | undefined>();
  const [loading, settLoading] = useState<boolean>();
  const [, dispatch] = useStore();

  const initialValues: FormFields = {
    ...(tilleggsadresse && {
      ...tilleggsadresse,
    }),
  };

  const formConfig = {
    tilleggslinje: {
      isBlacklistedCommon: msg({ id: "validation.svarteliste.felles" }),
      isFirstCharNotSpace: msg({ id: "validation.firstchar.notspace" }),
    },
    eiendomsnavn: {
      isRequired: msg({ id: "validation.stedsadresse.pakrevd" }),
      isBlacklistedCommon: msg({ id: "validation.svarteliste.felles" }),
      isLettersSpaceAndDigits: msg({
        id: "validation.only.letters.space.and.digits",
      }),
    },
    postnummer: {
      isRequired: msg({ id: "validation.postnummer.pakrevd" }),
    },
    datoTilOgMed: {
      isRequired: msg({ id: "validation.tomdato.pakrevd" }),
    },
  };

  const getUpdatedData = () =>
    fetchPersonInfo().then((personInfo) => {
      dispatch({
        type: "SETT_PERSON_INFO_RESULT",
        payload: personInfo as PersonInfo,
      });
    });

  const onSuccess = () => {
    settOpprettEllerEndre(false);
  };

  const submit = (c: FormContext) => {
    const { isValid, fields } = c;
    if (isValid) {
      const { datoTilOgMed, tilleggslinje, ...equalFields } = fields;

      const outbound = {
        ...equalFields,
        gyldigTom: datoTilOgMed,
        ...(tilleggslinje && {
          tilleggslinjeType: "CO",
          tilleggslinje,
        }),
      } as OutboundStedsadresse;

      settLoading(true);
      postStedsadresse(outbound)
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
      {({ errors, fields, isValid, submitted, setField, setError }) => {
        return (
          <>
            <InputMedHjelpetekst
              bredde={"L"}
              maxLength={26}
              submitted={submitted}
              hjelpetekst={"adresse.hjelpetekster.co"}
              label={msg({ id: "felter.tilleggslinje.label" })}
              placeholder={msg({ id: "felter.tilleggslinje.placeholder" })}
              onChange={(value) => setField({ tilleggslinje: value })}
              value={fields.tilleggslinje}
              error={errors.tilleggslinje}
            />
            <div className="adresse__rad">
              <div className="adresse__kolonne">
                <Input
                  bredde={"XXL"}
                  maxLength={30}
                  value={fields.eiendomsnavn}
                  label={msg({ id: "felter.stedsadresse.label" })}
                  onChange={(e) => setField({ eiendomsnavn: e.target.value })}
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
                  label={msg({ id: "felter.postnummer.label" })}
                  onChange={(postnummer) => setField({ postnummer })}
                  onErrors={(error) =>
                    setError({ ...errors, postnummer: error })
                  }
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
                  label={msg({ id: "felter.gyldigtom.label" })}
                  ugyldigTekst={msg({ id: "validation.tomdato.ugyldig" })}
                  onChange={(value) => setField({ datoTilOgMed: value })}
                  onErrors={(error) =>
                    setError({ ...errors, datoTilOgMed: error })
                  }
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

export default OpprettEllerEndreStedsadresse;
