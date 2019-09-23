import React, { useState } from "react";
import { Input } from "nav-frontend-skjema";
import { FormContext, FormValidation } from "calidation";
import { fetchPersonInfo, postKontonummer } from "clients/apiClient";
import { Knapp } from "nav-frontend-knapper";
import { FormattedMessage } from "react-intl";
import { useStore } from "providers/Provider";
import { PersonInfo } from "types/personInfo";
import { InjectedIntlProps, injectIntl } from "react-intl";
import Alert, { AlertType } from "components/alert/Alert";

interface Props {
  kontonummer?: string;
  onChangeSuccess: () => void;
}

export interface OutboundNorskKontonummer {
  value: string;
}

const OpprettEllerEndreNorskKontonr = (props: Props & InjectedIntlProps) => {
  const [loading, settLoading] = useState(false);
  const [alert, settAlert] = useState<AlertType | undefined>();
  const { onChangeSuccess, kontonummer, intl } = props;
  const [, dispatch] = useStore();

  const initialValues = kontonummer
    ? {
        kontonummer: kontonummer
      }
    : {};

  const formConfig = {
    kontonummer: {
      isRequired: intl.messages["validation.kontonummer.pakrevd"],
      isNumber: intl.messages["validation.kontonummer.siffer"],
      isExactLength: {
        message: intl.messages["validation.kontonummer.elleve"],
        length: 11
      },
      isMod11: {
        message: intl.messages["validation.kontonummer.mod11"]
      }
    }
  };

  const getUpdatedData = () =>
    fetchPersonInfo().then(personInfo => {
      dispatch({
        type: "SETT_PERSON_INFO_RESULT",
        payload: personInfo as PersonInfo
      });
    });

  const submitEndre = (e: FormContext) => {
    const { isValid, fields } = e;
    const { kontonummer } = fields;

    if (isValid) {
      const outbound = {
        value: kontonummer
      };

      settLoading(true);
      postKontonummer(outbound)
        .then(getUpdatedData)
        .then(onChangeSuccess)
        .catch((alert: AlertType) => {
          settLoading(false);
          settAlert(alert);
        });
    }
  };

  return (
    <FormValidation
      onSubmit={submitEndre}
      config={formConfig}
      initialValues={initialValues}
    >
      {({ errors, fields, submitted, isValid, setField }) => {
        return (
          <>
            <div className="utbetalinger__rad">
              <div className="utbetalinger__input input--m">
                <Input
                  bredde={"M"}
                  maxLength={11}
                  value={fields.kontonummer}
                  label={intl.messages["felter.kontonummer.label"]}
                  onChange={e => setField({ kontonummer: e.target.value })}
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
                  disabled={submitted && !isValid}
                  autoDisableVedSpinner={true}
                  spinner={loading}
                >
                  <FormattedMessage id={"side.lagre"} />
                </Knapp>
              </div>
            </div>
            {alert && <Alert {...alert} />}
          </>
        );
      }}
    </FormValidation>
  );
};

export default injectIntl(OpprettEllerEndreNorskKontonr);
