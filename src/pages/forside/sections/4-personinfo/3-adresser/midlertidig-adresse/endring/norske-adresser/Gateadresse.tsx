import React, { useState } from "react";
import { Input } from "nav-frontend-skjema";
import { Knapp } from "nav-frontend-knapper";
import { FormattedMessage } from "react-intl";
import { FormContext, FormValidation } from "calidation";
import { ExtraFieldsConfig, sjekkForFeil } from "utils/validators";
import DayPicker from "components/felter/day-picker/DayPicker";
import { fetchPersonInfo, postGateadresse } from "clients/apiClient";
import { Tilleggsadresse } from "types/adresser/tilleggsadresse";
import { RADIX_DECIMAL } from "utils/formattering";
import InputPostnummer from "components/felter/input-postnummer/InputPostnummer";
import { PersonInfo } from "types/personInfo";
import { useStore } from "providers/Provider";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { oneYearAhead } from "utils/date";
import Alert, { AlertType } from "components/alert/Alert";

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
  const [alert, settAlert] = useState<AlertType | undefined>();
  const [loading, settLoading] = useState();
  const [, dispatch] = useStore();

  const trimAdresse = (
    adresse: string = "",
    husbokstav: string = "",
    bolignummer: string = ""
  ) => adresse.replace(` ${husbokstav} ${bolignummer}`, ``);

  const initialValues = {
    datoTilOgMed: oneYearAhead,
    ...(tilleggsadresse && {
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
    })
  };

  const formConfig: ExtraFieldsConfig = {
    tilleggslinje: {
      isBlacklistedCommon: intl.messages["validation.svarteliste.felles"]
    },
    gatenavn: {
      isBlacklistedCommon: intl.messages["validation.svarteliste.felles"],
      isLettersOrDigits: intl.messages["validation.only.letters.and.digits"],
      isRequired: intl.messages["validation.gatenavn.pakrevd"]
    },
    husnummer: {
      isNumber: intl.messages["validation.only.digits"]
    },
    husbokstav: {
      isBlacklistedCommon: intl.messages["validation.svarteliste.felles"],
      isLetters: intl.messages["validation.only.letters"]
    },
    bolignummer: {
      isBlacklistedCommon: intl.messages["validation.svarteliste.felles"],
      isHouseNumber: intl.messages["validation.husnymmer.ugyldig"]
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
      const { datoTilOgMed, tilleggslinje, husnummer, ...equalFields } = fields;

      const outbound = {
        ...equalFields,
        husnummer: parseInt(husnummer, RADIX_DECIMAL),
        gyldigTom: datoTilOgMed,
        ...(tilleggslinje && {
          tilleggslinjeType: "C/O",
          tilleggslinje
        })
      } as OutboundGateadresse;

      settLoading(true);
      postGateadresse(outbound)
        .then(getUpdatedData)
        .then(onChangeSuccess)
        .catch((error: AlertType) => {
          settLoading(false);
          settAlert(error);
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
              <div className="adresse__kolonne">
                <Input
                  bredde={"XXL"}
                  maxLength={30}
                  value={fields.gatenavn}
                  label={intl.messages["felter.gatenavn.label"]}
                  onChange={e => setField({ gatenavn: e.target.value })}
                  feil={sjekkForFeil(submitted, errors.gatenavn)}
                />
              </div>
              <div className="adresse__kolonne">
                <div className="adresse__rad">
                  <Input
                    min={1}
                    bredde={"XS"}
                    type={"number"}
                    label={intl.messages["felter.gatenummer.label"]}
                    value={fields.husnummer || ""}
                    className="adresse__input-avstand"
                    feil={sjekkForFeil(submitted, errors.husnummer)}
                    onChange={({ target }) => {
                      if (target.value.length <= 6) {
                        setField({ husnummer: target.value });
                      }
                    }}
                  />
                  <Input
                    bredde={"XS"}
                    maxLength={1}
                    value={fields.husbokstav}
                    className="adresse__input-avstand"
                    label={intl.messages["felter.gatebokstav.label"]}
                    feil={sjekkForFeil(submitted, errors.husbokstav)}
                    onChange={({ target }) =>
                      setField({ husbokstav: target.value.toUpperCase() })
                    }
                  />
                </div>
              </div>
            </div>
            <div className="adresse__rad">
              <Input
                maxLength={5}
                className="adresse__input-avstand adresse__input-bolignummer"
                value={fields.bolignummer}
                label={intl.messages["felter.bolignummer.label"]}
                onChange={e => setField({ bolignummer: e.target.value })}
                feil={sjekkForFeil(submitted, errors.bolignummer)}
                bredde={"S"}
              />
              <InputPostnummer
                submitted={submitted}
                value={fields.postnummer}
                error={errors.postnummer}
                label={intl.messages["felter.postnummer.label"]}
                onChange={postnummer => setField({ postnummer })}
                onErrors={error => setError({ postnummer: error })}
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

export default injectIntl(OpprettEllerEndreGateadresse);
