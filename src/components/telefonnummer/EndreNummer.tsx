import { Element, Normaltekst } from "nav-frontend-typografi";
import { FormattedMessage } from "react-intl";
import { Input } from "nav-frontend-skjema";
import React, { useState } from "react";
import { NedChevron } from "nav-frontend-chevron";
import { Knapp } from "nav-frontend-knapper";
import { Form, FormContext, Validation } from "calidation";
import AlertStripe, { AlertStripeType } from "nav-frontend-alertstriper";
import { postTlfnummer, slettTlfnummer } from "../../clients/apiClient";
import { HTTPError } from "../error/Error";
import endreIkon from "../../assets/img/Pencil.svg";
import slettIkon from "../../assets/img/Slett.svg";
import { formConfig } from "./Utils";

interface Props {
  type: string;
  titleId: string;
  value?: string;
}

interface Alert {
  type: AlertStripeType;
  melding: string;
}
const EndreTelefonnummer = (props: Props) => {
  const { value, titleId, type } = props;
  const [endreLoading, settEndreLoading] = useState(false);
  const [slettLoading, settSlettLoading] = useState(false);
  const [endre, settEndre] = useState(false);
  const [alert, settAlert] = useState<Alert | undefined>();

  const initialFields = {
    tlfnummer: value
  };

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

  const submitSlett = () => {
    if (!value) {
      return;
    }

    const outbound = {
      type,
      landskode: "+47",
      nummer: value
    };

    settSlettLoading(true);
    slettTlfnummer(outbound)
      .then(() => {
        settAlert({
          type: "suksess",
          melding: "Telefonnummeret ble slettet"
        });
      })
      .catch((error: HTTPError) => {
        settAlert({
          type: "feil",
          melding: `${error.code} - ${error.text}`
        });
      })
      .then(() => {
        settSlettLoading(false);
      });
  };

  return value ? (
    <Form onSubmit={submitEndre} className={"tlfnummer__rad"}>
      <Validation config={formConfig} initialValues={initialFields}>
        {({ errors, fields, submitted, setField }) => {
          return (
            <>
              <div className={"tlfnummer__container"}>
                <div>
                  <Element>
                    <FormattedMessage id={titleId} />
                  </Element>
                  {endre && (
                    <div className={"tlfnummer__chevron"}>
                      <NedChevron />
                    </div>
                  )}
                  {endre ? (
                    <div>
                      <div className={"tlfnummer__input-container"}>
                        <div className={"tlfnummer__input"}>
                          <Input
                            label={"Landskode"}
                            value={fields.landskode}
                            onChange={e =>
                              setField({ landskode: e.target.value })
                            }
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
                            bredde={"M"}
                            type={"tel"}
                            feil={
                              submitted && errors.tlfnummer
                                ? { feilmelding: errors.tlfnummer }
                                : undefined
                            }
                            onChange={e =>
                              setField({ tlfnummer: e.target.value })
                            }
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
                  ) : (
                    <Normaltekst>{value}</Normaltekst>
                  )}
                </div>
                <div className={"tlfnummer_knapper"}>
                  <Knapp
                    type={"flat"}
                    htmlType={"button"}
                    className={"tlfnummer__knapp"}
                    onClick={() => settEndre(!endre)}
                  >
                    {endre ? (
                      <FormattedMessage id={"side.avbryt"} />
                    ) : (
                      <>
                        <div className={"tlfnummer__knapp-ikon"}>
                          <img alt={"Endre telefonnummer"} src={endreIkon} />
                        </div>
                      </>
                    )}
                  </Knapp>
                  <Knapp
                    type={"flat"}
                    htmlType={"button"}
                    className={"tlfnummer__knapp"}
                    autoDisableVedSpinner={true}
                    spinner={slettLoading}
                    onClick={() => submitSlett()}
                  >
                    <div className={"tlfnummer__knapp-ikon"}>
                      <img alt={"Slett telefonnummer"} src={slettIkon} />
                    </div>
                  </Knapp>
                </div>
              </div>
              {alert && (
                <AlertStripe type={alert.type}>
                  <span>{alert.melding}</span>
                </AlertStripe>
              )}
            </>
          );
        }}
      </Validation>
    </Form>
  ) : null;
};

export default EndreTelefonnummer;
