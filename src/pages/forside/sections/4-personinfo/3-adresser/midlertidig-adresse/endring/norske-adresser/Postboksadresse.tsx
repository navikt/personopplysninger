import React, { useState } from "react";
import { Tilleggsadresse } from "../../../../../../../../types/adresser/tilleggsadresse";
import { Input } from "nav-frontend-skjema";
import {
  blacklistedWords,
  sjekkForFeil
} from "../../../../../../../../utils/validators";
import {
  settDersomInteger,
  visDersomInteger
} from "../../../../../../../../utils/formattering";
import InputPostnummer from "../../../../../../../../components/felter/input-postnummer/InputPostnummer";
import DayPicker from "../../../../../../../../components/felter/day-picker/DayPicker";
import { Knapp } from "nav-frontend-knapper";
import { FormattedMessage } from "react-intl";
import AlertStripe from "nav-frontend-alertstriper";
import { FormContext, FormValidation } from "calidation";
import {
  fetchPersonInfo,
  postPostboksadresse
} from "../../../../../../../../clients/apiClient";
import { HTTPError } from "../../../../../../../../components/error/Error";
import { PersonInfo } from "../../../../../../../../types/personInfo";
import { useStore } from "../../../../../../../../providers/Provider";

interface Props {
  tilleggsadresse?: Tilleggsadresse;
  onChangeSuccess: () => void;
}

export interface OutboundPostboksadresse {
  tilleggslinje: string;
  postboksnummer: string;
  postboksanlegg: string;
  postnummer: string;
  gyldigTom: string;
}

const OpprettEllerEndrePostboksadresse = (props: Props) => {
  const { tilleggsadresse, onChangeSuccess } = props;
  const [loading, settLoading] = useState();
  const [alert, settAlert] = useState();
  const [, dispatch] = useStore();

  const initialValues = {
    ...tilleggsadresse
  };

  const formConfig = {
    tilleggslinje: {
      isBlacklisted: blacklistedWords
    },
    postboksnummer: {
      isBlacklisted: blacklistedWords
    },
    postboksanlegg: {
      isBlacklisted: blacklistedWords
    },
    postnummer: {
      isBlacklisted: blacklistedWords
    },
    datoTilOgMed: {
      isBlacklisted: blacklistedWords
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
      } as OutboundPostboksadresse;

      settLoading(true);
      postPostboksadresse(outbound)
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
                  placeholder={"C/O"}
                  label={"Person som eier adressen (valgfri)"}
                  value={fields.tilleggslinje}
                  onChange={e => setField({ tilleggslinje: e.target.value })}
                  feil={sjekkForFeil(submitted, errors.tilleggslinje)}
                />
              </div>
              <div className="addresse__kolonne" />
            </div>
            <div className="addresse__rad">
              <Input
                min={1}
                bredde={"S"}
                type={"number"}
                label={"Postboksnummer"}
                value={visDersomInteger(fields.postboksnummer)}
                className="addresse__input-avstand"
                feil={sjekkForFeil(submitted, errors.postboksnummer)}
                onChange={({ target }) =>
                  setField({ postboksnummer: settDersomInteger(target.value) })
                }
              />
              <Input
                bredde={"M"}
                label={"Postboksanlegg"}
                value={fields.postboksanlegg}
                onChange={e => setField({ postboksanlegg: e.target.value })}
                className="addresse__input-avstand"
                feil={sjekkForFeil(submitted, errors.postboksanlegg)}
              />
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

export default OpprettEllerEndrePostboksadresse;
