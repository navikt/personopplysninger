import React, { useState } from "react";
import { Input } from "nav-frontend-skjema";
import { FormContext, FormValidation } from "calidation";
import { postKontonummer } from "../../../../../../clients/apiClient";
import { HTTPError } from "../../../../../../components/error/Error";
import AlertStripe, { AlertStripeType } from "nav-frontend-alertstriper";
import { Knapp } from "nav-frontend-knapper";
import { FormattedMessage } from "react-intl";

interface Props {
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
  const { onChangeSuccess } = props;

  const formConfig = {
    kontonummer: {
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

  const normalize = (input: string) => {
    return input.replace(/\D/g, "");
  };

  const format = (input: string) => {
    if (input.length > 6) {
      return input.replace(/^(.{4})(.{2})(.*)$/, "$1 $2 $3");
    }
    if (input.length > 4) {
      return input.replace(/^(.{4})(.*)$/, "$1 $2");
    }
    return input;
  };

  return (
    <FormValidation onSubmit={submitEndre} config={formConfig}>
      {({ errors, fields, submitted, setField }) => {
        return (
          <>
            <div style={{ width: "50%" }}>
              <Input
                label={"Kontonummer"}
                value={format(fields.kontonummer)}
                onChange={e =>
                  setField({ kontonummer: normalize(e.target.value) })
                }
                feil={
                  submitted && errors.kontonummer
                    ? { feilmelding: errors.kontonummer }
                    : undefined
                }
                maxLength={13}
                bredde={"M"}
              />
            </div>
            <div className={"utbetalinger__knapp-container"}>
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

export default OpprettEllerEndreNorskKontonr;
