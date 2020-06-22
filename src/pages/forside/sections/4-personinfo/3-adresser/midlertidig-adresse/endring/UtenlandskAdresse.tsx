import React, { useState } from "react";
import { UtenlandskAdresse as UtenlandskAdresseType } from "types/adresser/utenlandskadresse";
import { Input, SkjemaGruppe } from "nav-frontend-skjema";
import { Knapp } from "nav-frontend-knapper";
import { FormattedMessage } from "react-intl";
import { Errors, Fields, FormContext, FormValidation } from "calidation";
import InputMedHjelpetekst from "components/felter/input-med-hjelpetekst/InputMedHjelpetekst";
import SelectLand from "components/felter/kodeverk/SelectLand";
import DayPicker from "components/felter/day-picker/DayPicker";
import { fetchPersonInfo, postUtenlandskAdresse } from "clients/apiClient";
import { UNKNOWN } from "utils/text";
import { PersonInfo } from "types/personInfo";
import { useStore } from "store/Context";
import { useIntl } from "react-intl";
import Alert, { AlertType } from "components/alert/Alert";

interface Props {
  utenlandskadresse?: UtenlandskAdresseType;
  settOpprettEllerEndre: (opprettEllerEndre: boolean) => void;
}

export interface OutboundUtenlandskAdresse {
  adresselinje1: string;
  adresselinje2: string;
  adresselinje3: string;
  landkode: string;
  gyldigTom: string;
}

const OpprettEllerEndreUtenlandskAdresse = (props: Props) => {
  const { utenlandskadresse, settOpprettEllerEndre } = props;
  const [alert, settAlert] = useState<AlertType | undefined>();
  const [loading, settLoading] = useState<boolean>();
  const [, dispatch] = useStore();
  const { formatMessage: msg } = useIntl();

  const initialValues = {
    ...(utenlandskadresse && {
      ...utenlandskadresse,
      land: {
        label: utenlandskadresse.land,
        value: UNKNOWN,
      },
    }),
  };

  const formConfig = {
    adresse1: {
      isRequired: msg({ id: "validation.gateadresse.pakrevd" }),
    },
    adresse2: {},
    adresse3: {},
    land: {
      isRequired: msg({ id: "validation.land.pakrevd" }),
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
      const outbound: OutboundUtenlandskAdresse = {
        adresselinje1: fields.adresse1,
        adresselinje2: fields.adresse2,
        adresselinje3: fields.adresse3,
        landkode: fields.land.value,
        gyldigTom: fields.datoTilOgMed,
      };

      settLoading(true);
      postUtenlandskAdresse(outbound)
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
      {(calidation) => {
        const fields: Fields = calidation.fields;
        const errors: Errors = calidation.errors;
        const isValid = calidation.isValid;
        const submitted = calidation.submitted;
        const setField = calidation.setField;
        const setError = calidation.setError;
        return (
          <>
            <SkjemaGruppe feil={submitted && errors.adresse1}>
              <InputMedHjelpetekst
                bredde={"L"}
                submitted={submitted}
                maxLength={30}
                value={fields.adresse1}
                hjelpetekst={"adresse.hjelpetekster.utenlandsk.adresse"}
                label={msg({ id: "felter.adresse.label" })}
                onChange={(value) => setField({ adresse1: value })}
              />
              <Input
                label={""}
                bredde={"L"}
                maxLength={30}
                value={fields.adresse2}
                onChange={(e) => setField({ adresse2: e.target.value })}
              />
              <Input
                label={""}
                bredde={"L"}
                maxLength={30}
                value={fields.adresse3}
                onChange={(e) => setField({ adresse3: e.target.value })}
              />
            </SkjemaGruppe>
            <SelectLand
              label={msg({ id: "felter.land.label" })}
              submitted={submitted}
              option={fields.land}
              error={errors.land}
              onChange={(land) => setField({ land })}
            />
            <DayPicker
              submitted={submitted}
              value={fields.datoTilOgMed}
              error={errors.datoTilOgMed}
              label={msg({ id: "felter.gyldigtom.label" })}
              ugyldigTekst={msg({ id: "validation.tomdato.ugyldig" })}
              onChange={(value) => setField({ datoTilOgMed: value })}
              onErrors={(error) => setError({ datoTilOgMed: error })}
            />
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

export default OpprettEllerEndreUtenlandskAdresse;
