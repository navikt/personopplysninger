import React, { useState } from "react";
import { UtenlandskAdresse as UtenlandskAdresseType } from "../../../../../../../types/adresser/utenlandskadresse";
import { Input } from "nav-frontend-skjema";
import { Knapp } from "nav-frontend-knapper";
import { FormattedMessage } from "react-intl";
import { FormContext, FormValidation } from "calidation";
import { sjekkForFeil } from "../../../../../../../utils/validators";
import SelectLand from "../../../../../../../components/felter/kodeverk/SelectLand";
import DayPicker from "../../../../../../../components/felter/day-picker/DayPicker";
import {
  fetchPersonInfo,
  postUtenlandskAdresse
} from "../../../../../../../clients/apiClient";
import { HTTPError } from "../../../../../../../components/error/Error";
import { UNKNOWN } from "../../../../../../../utils/text";
import { PersonInfo } from "../../../../../../../types/personInfo";
import { useStore } from "../../../../../../../providers/Provider";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { oneYearAhead } from "../../../../../../../utils/date";
import Alert, { AlertType } from "components/alert/Alert";

interface Props {
  utenlandskadresse?: UtenlandskAdresseType;
  onChangeSuccess: () => void;
}

export interface OutboundUtenlandskAdresse {
  adresselinje1: string;
  adresselinje2: string;
  adresselinje3: string;
  landkode: string;
  gyldigTom: string;
}

const OpprettEllerEndreUtenlandskAdresse = (
  props: Props & InjectedIntlProps
) => {
  const { utenlandskadresse, onChangeSuccess, intl } = props;
  const [alert, settAlert] = useState<AlertType | undefined>();
  const [loading, settLoading] = useState();
  const [, dispatch] = useStore();

  const initialValues = {
    datoTilOgMed: oneYearAhead,
    ...(utenlandskadresse && {
      ...utenlandskadresse,
      land: {
        label: utenlandskadresse.land,
        value: UNKNOWN
      }
    })
  };

  const formConfig = {
    adresse1: {
      isRequired: intl.messages["validation.gateadresse.pakrevd"]
    },
    adresse2: {},
    adresse3: {},
    land: {
      isRequired: intl.messages["validation.land.pakrevd"]
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
      const outbound: OutboundUtenlandskAdresse = {
        adresselinje1: fields.adresse1,
        adresselinje2: fields.adresse2,
        adresselinje3: fields.adresse3,
        landkode: fields.land.value,
        gyldigTom: fields.datoTilOgMed
      };

      settLoading(true);
      postUtenlandskAdresse(outbound)
        .then(getUpdatedData)
        .then(onChangeSuccess)
        .catch((error: HTTPError) => {
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
                  value={fields.adresse1}
                  label={intl.messages["felter.adresse.label"]}
                  onChange={e => setField({ adresse1: e.target.value })}
                  feil={sjekkForFeil(submitted, errors.adresse1)}
                />
              </div>
              <div className="adresse__kolonne" />
            </div>
            <div className="adresse__rad">
              <div className="adresse__kolonne">
                <Input
                  label={""}
                  bredde={"XXL"}
                  maxLength={30}
                  value={fields.adresse2}
                  onChange={e => setField({ adresse2: e.target.value })}
                  feil={sjekkForFeil(submitted, errors.adresse2)}
                />
              </div>
              <div className="adresse__kolonne" />
            </div>
            <div className="adresse__rad">
              <div className="adresse__kolonne">
                <Input
                  label={""}
                  bredde={"XXL"}
                  maxLength={30}
                  value={fields.adresse3}
                  onChange={e => setField({ adresse3: e.target.value })}
                  feil={sjekkForFeil(submitted, errors.adresse3)}
                />
              </div>
              <div className="adresse__kolonne" />
            </div>
            <div className="adresse__land-select">
              <SelectLand
                submitted={submitted}
                option={fields.land}
                error={errors.land}
                label={intl.messages["felter.land.label"]}
                onChange={land => setField({ land })}
              />
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

export default injectIntl(OpprettEllerEndreUtenlandskAdresse);
