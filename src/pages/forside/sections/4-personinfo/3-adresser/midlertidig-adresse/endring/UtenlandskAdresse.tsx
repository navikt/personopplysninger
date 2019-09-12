import React, { useState } from "react";
import { UtenlandskAdresse as UtenlandskAdresseType } from "../../../../../../../types/adresser/utenlandskadresse";
import { Input } from "nav-frontend-skjema";
import { Knapp } from "nav-frontend-knapper";
import { FormattedMessage } from "react-intl";
import { FormContext, FormValidation } from "calidation";
import AlertStripe from "nav-frontend-alertstriper";
import { sjekkForFeil } from "../../../../../../../utils/validators";
import SelectLand from "../../../../../../../components/felter/kodeverk/SelectLand";
import DayPicker from "../../../../../../../components/felter/day-picker/DayPicker";
import { postUtenlandskAdresse } from "../../../../../../../clients/apiClient";
import { HTTPError } from "../../../../../../../components/error/Error";
import { UNKNOWN } from "../../../../../../../utils/text";

interface Props {
  utenlandskadresse: UtenlandskAdresseType;
  onChangeSuccess: (konto: UtenlandskAdresseType) => void;
}

export interface OutboundUtenlandskAdresse {
  adresselinje1: string;
  adresselinje2: string;
  adresselinje3: string;
  landkode: string;
  gyldigTom: string;
}

const OpprettEllerEndreUtenlandskAdresse = (props: Props) => {
  const [loading, settLoading] = useState();
  const [alert, settAlert] = useState();
  const { utenlandskadresse } = props;

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
      isRequired: "Gateadresse er påkrevd"
    },
    adresse2: {},
    adresse3: {},
    land: {
      isRequired: "Land er påkrevd"
    },
    datoTilOgMed: {
      isRequired: "Gyldig til er påkrevd"
    }
  };

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

      const view = {
        ...fields,
        land: fields.land.label
      };

      settLoading(true);
      postUtenlandskAdresse(outbound)
        .then(() => {
          props.onChangeSuccess(view);
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
            <div className="addresse__rad">
              <div className="addresse__kolonne">
                <Input
                  label={"Adresse"}
                  value={fields.adresse1}
                  onChange={e => setField({ adresse1: e.target.value })}
                  bredde={"XXL"}
                  feil={sjekkForFeil(submitted, errors.adresse1)}
                />
              </div>
              <div className="addresse__kolonne" />
            </div>
            <div className="addresse__rad">
              <div className="addresse__kolonne">
                <Input
                  label={""}
                  value={fields.adresse2}
                  onChange={e => setField({ adresse2: e.target.value })}
                  bredde={"XXL"}
                  feil={sjekkForFeil(submitted, errors.adresse2)}
                />
              </div>
              <div className="addresse__kolonne" />
            </div>
            <div className="addresse__rad">
              <div className="addresse__kolonne">
                <Input
                  label={""}
                  value={fields.adresse3}
                  onChange={e => setField({ adresse3: e.target.value })}
                  bredde={"XXL"}
                  feil={sjekkForFeil(submitted, errors.adresse3)}
                />
              </div>
              <div className="addresse__kolonne" />
            </div>
            <div className="addresse__land-select">
              <SelectLand
                option={fields.land}
                submitted={submitted}
                label={"Land"}
                error={errors.land}
                onChange={land => setField({ land })}
              />
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

export default OpprettEllerEndreUtenlandskAdresse;
