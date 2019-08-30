import { FormattedHTMLMessage, FormattedMessage } from "react-intl";
import { Input, Select } from "nav-frontend-skjema";
import React, { useState } from "react";
import { Knapp } from "nav-frontend-knapper";
import { Form, FormContext, Validation } from "calidation";
import AlertStripe, { AlertStripeType } from "nav-frontend-alertstriper";
import { postTlfnummer } from "../../clients/apiClient";
import { HTTPError } from "../error/Error";
import { formConfig } from "./Utils";
import avbrytIkon from "../../assets/img/Back.svg";
import { Element, Normaltekst } from "nav-frontend-typografi";
import { NedChevron } from "nav-frontend-chevron";

interface Props {
  onCancelClick: () => void;
}

interface Alert {
  type: AlertStripeType;
  melding: string;
}
const OpprettTelefonnummer = (props: Props) => {
  const [type, settType] = useState();
  const [endreLoading, settEndreLoading] = useState(false);
  const [alert, settAlert] = useState<Alert | undefined>();

  const submitEndre = (e: FormContext) => {
    const { isValid, fields } = e;
    const { landskode, tlfnummer } = fields;

    if (isValid) {
      const outbound = {
        type,
        landskode,
        nummer: tlfnummer
      };

      settEndreLoading(true);
      postTlfnummer(outbound)
        .then(() => {
          settAlert({
            type: "suksess",
            melding: "Telefonnummeret ble oppdatert"
          });
        })
        .catch((error: HTTPError) => {
          settAlert({
            type: "feil",
            melding: `${error.code} - ${error.text}`
          });
        })
        .then(() => {
          settEndreLoading(false);
        });
    }
  };

  return (
    <Form onSubmit={submitEndre} className={"tlfnummer__rad-leggtil"}>
      <Validation config={formConfig}>
        {({ errors, fields, submitted, setField }) => {
          return (
            <>
              <div className={"tlfnummer__container"}>
                <div>
                  <Element>
                    <FormattedMessage id="side.leggtil"></FormattedMessage>
                  </Element>
                  <div className={"tlfnummer__chevron"}>
                    <NedChevron />
                  </div>
                  <Select
                    label={"Type"}
                    value={fields.landskode}
                    onChange={e => setField({ landskode: e.target.value })}
                    bredde={"s"}
                    feil={
                      submitted && errors.landskode
                        ? { feilmelding: errors.landskode }
                        : undefined
                    }
                  >
                    <option>Test</option>
                  </Select>
                  <div className={"tlfnummer__input-container"}>
                    <div className={"tlfnummer__input"}>
                      <Input
                        label={"Landskode"}
                        value={fields.landskode}
                        onChange={e => setField({ landskode: e.target.value })}
                        feil={
                          submitted && errors.landskode
                            ? { feilmelding: errors.landskode }
                            : undefined
                        }
                        bredde={"S"}
                      />
                    </div>
                    <div className={"tlfnummer__input"}>
                      <Input
                        label={"Telefonnummer"}
                        value={fields.tlfnummer}
                        type={"tel"}
                        bredde={"M"}
                        feil={
                          submitted && errors.tlfnummer
                            ? { feilmelding: errors.tlfnummer }
                            : undefined
                        }
                        onChange={e => setField({ tlfnummer: e.target.value })}
                      />
                    </div>
                    <div className={"tlfnummer__submit"}>
                      <Knapp
                        type={"hoved"}
                        htmlType={"submit"}
                        autoDisableVedSpinner={true}
                        spinner={endreLoading}
                      >
                        <FormattedMessage id={"side.lagre"} />
                      </Knapp>
                    </div>
                  </div>
                </div>
                <div onClick={props.onCancelClick}>
                  <Normaltekst className="kilde__lenke lenke">
                    <FormattedHTMLMessage id="side.avbryt" />
                    <span className="kilde__icon">
                      <img src={avbrytIkon} alt="Ekstern lenke" />
                    </span>
                  </Normaltekst>
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
      </Validation>
    </Form>
  );
};

export default OpprettTelefonnummer;
