import React, { useState } from "react";
import { Input } from "nav-frontend-skjema";
import { Knapp } from "nav-frontend-knapper";
import { FormattedMessage } from "react-intl";
import { FormContext, FormValidation } from "calidation";
import AlertStripe from "nav-frontend-alertstriper";
import {
  blacklistedWords,
  sjekkForFeil
} from "../../../../../../../../utils/validators";
import DayPicker from "../../../../../../../../components/felter/day-picker/DayPicker";
import {
  fetchPersonInfo,
  postGateadresse
} from "../../../../../../../../clients/apiClient";
import { HTTPError } from "../../../../../../../../components/error/Error";
import { Tilleggsadresse } from "../../../../../../../../types/adresser/tilleggsadresse";
import {
  RADIX_DECIMAL,
  settDersomInteger,
  visDersomInteger
} from "../../../../../../../../utils/formattering";
import InputPostnummer from "../../../../../../../../components/felter/input-postnummer/InputPostnummer";
import { PersonInfo } from "../../../../../../../../types/personInfo";
import { useStore } from "../../../../../../../../providers/Provider";
import { InjectedIntlProps, injectIntl } from "react-intl";

interface Props {
  tilleggsadresse?: Tilleggsadresse;
  onChangeSuccess: () => void;
}

export interface OutboundGateadresse {
  bolignummer: string;
  gatekode: number;
  gatenavn: string;
  gyldigTom: string;
  husbokstav: string;
  husnummer: number;
  kommunenummer: string;
  postnummer: string;
  tilleggslinje: string;
  tilleggslinjeType: string;
}

const OpprettEllerEndreGateadresse = (props: Props & InjectedIntlProps) => {
  const { tilleggsadresse, onChangeSuccess, intl } = props;
  const [loading, settLoading] = useState();
  const [alert, settAlert] = useState();
  const [, dispatch] = useStore();

  const trimAdresse = (
    adresse: string = "",
    husbokstav: string = "",
    bolignummer: string = ""
  ) => adresse.replace(` ${husbokstav} ${bolignummer}`, ``);

  const initialValues = tilleggsadresse
    ? {
        ...tilleggsadresse,
        ...(tilleggsadresse.husnummer && {
          husnummer: parseInt(tilleggsadresse.husnummer, RADIX_DECIMAL)
        }),
        ...(tilleggsadresse.adresse1 && tilleggsadresse.adresse2
          ? {
              tilleggslinje: tilleggsadresse.adresse1,
              gatenavn: trimAdresse(
                tilleggsadresse.adresse2,
                tilleggsadresse.husbokstav,
                tilleggsadresse.bolignummer
              )
            }
          : tilleggsadresse.adresse1 && {
              gatenavn: trimAdresse(
                tilleggsadresse.adresse1,
                tilleggsadresse.husbokstav,
                tilleggsadresse.bolignummer
              )
            })
      }
    : {};

  const formConfig = {
    tilleggslinje: {},
    gatenavn: {
      isBlacklisted: blacklistedWords,
      isLettersOrDigits: intl.messages["validation.only.letters.and.digits"],
      isRequired: intl.messages["validation.gatenavn.pakrevd"]
    },
    husnummer: {
      isBlacklisted: blacklistedWords,
      isNumber: intl.messages["validation.only.digits"]
    },
    husbokstav: {
      isBlacklisted: blacklistedWords
    },
    postnummer: {
      isBlacklisted: blacklistedWords,
      isRequired: "Bolignummer er påkrevd"
    },
    bolignummer: {
      isBlacklisted: blacklistedWords
    },
    datoTilOgMed: {
      isBlacklisted: blacklistedWords,
      isRequired: "Gyldig dato er påkrevd"
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
        gatekode: 1,
        gyldigTom: datoTilOgMed,
        tilleggslinjeType: "V"
      } as OutboundGateadresse;

      settLoading(true);
      postGateadresse(outbound)
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
              <div className="addresse__kolonne">
                <Input
                  bredde={"XXL"}
                  label={"Gatenavn"}
                  value={fields.gatenavn}
                  onChange={e => setField({ gatenavn: e.target.value })}
                  feil={sjekkForFeil(submitted, errors.gatenavn)}
                />
              </div>
              <div className="addresse__kolonne">
                <div className="addresse__rad">
                  <Input
                    min={1}
                    bredde={"XS"}
                    type={"number"}
                    label={"Nummer"}
                    value={visDersomInteger(fields.husnummer)}
                    className="addresse__input-avstand"
                    feil={sjekkForFeil(submitted, errors.husnummer)}
                    onChange={({ target }) =>
                      setField({ husnummer: settDersomInteger(target.value) })
                    }
                  />
                  <Input
                    label={"Bokstav"}
                    value={fields.husbokstav}
                    className="addresse__input-avstand"
                    onChange={e => setField({ husbokstav: e.target.value })}
                    bredde={"XS"}
                    feil={sjekkForFeil(submitted, errors.husbokstav)}
                  />
                </div>
              </div>
            </div>
            <div className="addresse__rad">
              <Input
                label={"Bolignummer"}
                className="addresse__input-avstand"
                value={fields.bolignummer}
                onChange={e => setField({ bolignummer: e.target.value })}
                feil={sjekkForFeil(submitted, errors.bolignummer)}
                bredde={"S"}
              />
              <InputPostnummer
                label={"Postnummer"}
                value={fields.postnummer}
                submitted={submitted}
                error={errors.postnummer}
                onChange={postnummer => setField({ postnummer })}
                onErrors={error => setError({ postnummer: error })}
              />
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

export default injectIntl(OpprettEllerEndreGateadresse);
