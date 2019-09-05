import React, { useState } from "react";
import { Input } from "nav-frontend-skjema";
import { FormContext, FormValidation } from "calidation";
import { postKontonummer } from "../../../../../../clients/apiClient";
import { HTTPError } from "../../../../../../components/error/Error";
import AlertStripe, { AlertStripeType } from "nav-frontend-alertstriper";
import { Knapp } from "nav-frontend-knapper";
import { FormattedMessage } from "react-intl";

interface Props {
  kontonummer?: string;
  onChangeSuccess: (kontonummer: string) => void;
}

interface Alert {
  type: AlertStripeType;
  melding: string;
}

export interface OutboundNorskKontonummer {
  value: string;
}

const OpprettEllerEndreNorskKontonr = (props: Props) => {
  const [loading, settLoading] = useState(false);
  const [alert, settAlert] = useState<Alert | undefined>();
  const { onChangeSuccess, kontonummer } = props;

  const initialValues = kontonummer
    ? {
        kontonummer: kontonummer
      }
    : {};

  const formConfig = {
    kontonummer: {
      isNumber: "Kontonummer må kun inneholde siffer",
      isRequired: "Kontonummer er påkrevd",
      isExactLength: {
        message: "Kontonummeret må være 11 siffer",
        length: 11
      }
    }
  };

  const submitEndre = (e: FormContext) => {
    const { isValid, fields } = e;
    const { kontonummer } = fields;

    if (isValid) {
      const outbound = {
        value: kontonummer
      };

      settLoading(true);
      postKontonummer(outbound)
        .then(() => {
          onChangeSuccess(kontonummer);
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
      onSubmit={submitEndre}
      config={formConfig}
      initialValues={initialValues}
    >
      {({ errors, fields, submitted, setField }) => {
        return (
          <>
            <div className="utbetalinger__rad">
              <div className="utbetalinger__input input--m">
                <Input
                  label={"Kontonummer"}
                  value={fields.kontonummer}
                  onChange={e => setField({ kontonummer: e.target.value })}
                  maxLength={11}
                  bredde={"M"}
                  feil={
                    submitted && errors.kontonummer
                      ? { feilmelding: errors.kontonummer }
                      : undefined
                  }
                />
              </div>
              <div className="utbetalinger__knapp">
                <Knapp
                  type={"hoved"}
                  htmlType={"submit"}
                  autoDisableVedSpinner={true}
                  spinner={loading}
                >
                  <FormattedMessage id={"side.lagre"} />
                </Knapp>
              </div>
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

export default OpprettEllerEndreNorskKontonr;
