import React, { useState } from "react";
import { UtenlandskAdresse as UtenlandskAdresseType } from "../../../../../../../types/adresser/utenlandskadresse";
import { Input } from "nav-frontend-skjema";
import { Knapp } from "nav-frontend-knapper";
import { FormattedMessage } from "react-intl";
import { FormContext, FormValidation } from "calidation";
import AlertStripe from "nav-frontend-alertstriper";
import {
  blacklistedWords,
  sjekkForFeil
} from "../../../../../../../utils/validators";
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
  const [loading, settLoading] = useState();
  const [alert, settAlert] = useState();
  const [, dispatch] = useStore();

  const initialValues = utenlandskadresse
    ? {
        ...utenlandskadresse,
        land: {
          label: utenlandskadresse.land,
          value: UNKNOWN
        }
      }
    : {};

  const formConfig = {
    adresse1: {
      isBlacklisted: blacklistedWords,
      isRequired: intl.messages["validation.gateadresse.pakrevd"]
    },
    adresse2: {
      isBlacklisted: blacklistedWords
    },
    adresse3: {
      isBlacklisted: blacklistedWords
    },
    land: {
      isBlacklisted: blacklistedWords,
      isRequired: intl.messages["validation.land.pakrevd"]
    },
    datoTilOgMed: {
      isBlacklisted: blacklistedWords,
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
      {({ errors, fields, submitted, isValid, setField, setError }) => {
        return (
          <>
            <div className="addresse__rad">
              <div className="addresse__kolonne">
                <Input
                  bredde={"XXL"}
                  value={fields.adresse1}
                  label={intl.messages["felter.adresse.label"]}
                  onChange={e => setField({ adresse1: e.target.value })}
                  feil={sjekkForFeil(submitted, errors.adresse1)}
                />
              </div>
              <div className="addresse__kolonne" />
            </div>
            <div className="addresse__rad">
              <div className="addresse__kolonne">
                <Input
                  label={""}
                  bredde={"XXL"}
                  value={fields.adresse2}
                  onChange={e => setField({ adresse2: e.target.value })}
                  feil={sjekkForFeil(submitted, errors.adresse2)}
                />
              </div>
              <div className="addresse__kolonne" />
            </div>
            <div className="addresse__rad">
              <div className="addresse__kolonne">
                <Input
                  label={""}
                  bredde={"XXL"}
                  value={fields.adresse3}
                  onChange={e => setField({ adresse3: e.target.value })}
                  feil={sjekkForFeil(submitted, errors.adresse3)}
                />
              </div>
              <div className="addresse__kolonne" />
            </div>
            <div className="addresse__land-select">
              <SelectLand
                submitted={submitted}
                option={fields.land}
                error={errors.land}
                label={intl.messages["felter.land.label"]}
                onChange={land => setField({ land })}
              />
            </div>
            <div className="addresse__rad">
              <div className="addresse__kolonne">
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

export default injectIntl(OpprettEllerEndreUtenlandskAdresse);
