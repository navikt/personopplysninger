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
  const initialValues = {};

  const formConfig = {
    adresselinje1: {
      isRequired: "Gateadresse er påkrevd"
    },
    adresselinje2: {},
    adresselinje3: {},
    landkode: {
      isRequired: "Land er påkrevd"
    },
    gyldigTom: {
      isRequired: "Gyldig til er påkrevd"
    }
  };

  const submit = (c: FormContext) => {
    const { isValid, fields } = c;
    if (isValid) {
      const outbound: OutboundUtenlandskAdresse = {
        adresselinje1: fields.adresselinje1,
        adresselinje2: fields.adresselinje2,
        adresselinje3: fields.adresselinje3,
        landkode: fields.landkode,
        gyldigTom: fields.gyldigTom
      };

      settLoading(true);
      postUtenlandskAdresse(outbound)
        .then(() => {
          props.onChangeSuccess(fields as UtenlandskAdresseType);
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
            <Input
              label={"Adresse"}
              value={fields.adresselinje1}
              onChange={e => setField({ adresselinje1: e.target.value })}
              bredde={"XXL"}
              feil={sjekkForFeil(submitted, errors.adresselinje1)}
            />
            <Input
              label={""}
              value={fields.adresselinje2}
              onChange={e => setField({ adresselinje2: e.target.value })}
              bredde={"XXL"}
              feil={sjekkForFeil(submitted, errors.adresselinje2)}
            />
            <Input
              label={""}
              value={fields.adresselinje3}
              onChange={e => setField({ adresselinje3: e.target.value })}
              bredde={"XXL"}
              feil={sjekkForFeil(submitted, errors.adresselinje3)}
            />
            <div className="addresse__land-select">
              <SelectLand
                value={fields.landkode}
                submitted={submitted}
                label={"Land"}
                error={errors.landkode}
                onChange={landkode => setField({ landkode })}
              />
            </div>
            <DayPicker
              value={fields.gyldigTom}
              label={"Gyldig til"}
              submitted={submitted}
              error={errors.gyldigTom}
              onChange={value => setField({ gyldigTom: value })}
              onErrors={error => setError({ gyldigTom: error })}
            />
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
