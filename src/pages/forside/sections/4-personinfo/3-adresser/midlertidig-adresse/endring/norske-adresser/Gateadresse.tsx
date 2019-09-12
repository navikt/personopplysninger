import React, { useState } from "react";
import { Input } from "nav-frontend-skjema";
import { Knapp } from "nav-frontend-knapper";
import { FormattedMessage } from "react-intl";
import { FormContext, FormValidation } from "calidation";
import AlertStripe from "nav-frontend-alertstriper";
import { sjekkForFeil } from "../../../../../../../../utils/validators";
import DayPicker from "../../../../../../../../components/felter/day-picker/DayPicker";
import { postGateadresse } from "../../../../../../../../clients/apiClient";
import { HTTPError } from "../../../../../../../../components/error/Error";
import { Tilleggsadresse } from "../../../../../../../../types/adresser/tilleggsadresse";
import { RADIX_DECIMAL } from "../../../../../../../../utils/formattering";
import SelectPostnummer from "../../../../../../../../components/felter/kodeverk/SelectPostnummer";

interface Props {
  tilleggsadresse: Tilleggsadresse;
  onChangeSuccess: (konto: Tilleggsadresse) => void;
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

const OpprettEllerEndreGateadresse = (props: Props) => {
  const [loading, settLoading] = useState();
  const [alert, settAlert] = useState();
  const { tilleggsadresse } = props;

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
        ...(tilleggsadresse.postnummer && {
          postnummer: {
            label: `${tilleggsadresse.postnummer}`,
            value: tilleggsadresse.postnummer
          }
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
      isRequired: "Gateadresse er påkrevd"
    },
    husnummer: {
      isRequired: "Husnummer er påkrevd"
    },
    husbokstav: {
      isRequired: "Husbokstav er påkrevd"
    },
    postnummer: {
      isRequired: "Postnummer er påkrevd"
    },
    bolignummer: {
      isRequired: "Bolignummer er påkrevd"
    },
    datoTilOgMed: {
      isRequired: "Gyldig dato er påkrevd"
    }
  };

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
        .then(() => {
          console.log("Success");
        })
        .catch((error: HTTPError) => {
          settAlert({
            type: "feil",
            melding: `${error.code} - ${error.text}`
          });
        })
        .then(() => {
          settLoading(false);
        });
    }
  };

  return (
    <FormValidation
      onSubmit={submit}
      config={formConfig}
      initialValues={initialValues}
    >
      {({ errors, fields, submitted, setField, setError }) => {
        return (
          <>
            <div className="addresse__rad">
              <div className="addresse__kolonne">
                <Input
                  label={"Person som eier adressen (valgfri)"}
                  value={fields.tilleggslinje}
                  onChange={e => setField({ tilleggslinje: e.target.value })}
                  bredde={"XXL"}
                  feil={sjekkForFeil(submitted, errors.tilleggslinje)}
                />
              </div>
              <div className="addresse__kolonne" />
            </div>
            <div className="addresse__rad">
              <div className="addresse__kolonne">
                <Input
                  label={"Gatenavn"}
                  value={fields.gatenavn}
                  onChange={e => setField({ gatenavn: e.target.value })}
                  bredde={"XXL"}
                  feil={sjekkForFeil(submitted, errors.gatenavn)}
                />
              </div>
              <div className="addresse__kolonne">
                <div className="addresse__rad">
                  <Input
                    label={"Nummer"}
                    type={"number"}
                    value={parseInt(fields.husnummer, RADIX_DECIMAL)}
                    className="addresse__input-avstand"
                    onChange={e =>
                      setField({
                        husnummer: parseInt(e.target.value, RADIX_DECIMAL)
                      })
                    }
                    bredde={"XS"}
                    feil={sjekkForFeil(submitted, errors.husnummer)}
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
              <div className="addresse__kolonne">
                <SelectPostnummer
                  label={"Postnummer"}
                  option={fields.postnummer}
                  submitted={submitted}
                  error={errors.postnummer}
                  onChange={postnummer => setField({ postnummer })}
                />
              </div>
              <div className="addresse__kolonne">
                <Input
                  label={"Bolignummer"}
                  value={fields.bolignummer}
                  onChange={e => setField({ bolignummer: e.target.value })}
                  bredde={"S"}
                  feil={sjekkForFeil(submitted, errors.bolignummer)}
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

export default OpprettEllerEndreGateadresse;
