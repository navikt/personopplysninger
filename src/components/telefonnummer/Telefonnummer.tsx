import { Element, Normaltekst } from "nav-frontend-typografi";
import { FormattedMessage } from "react-intl";
import { Input } from "nav-frontend-skjema";
import React, { useState } from "react";
import { NedChevron } from "nav-frontend-chevron";
import { Knapp } from "nav-frontend-knapper";
import { Form, FormContext, Validation } from "calidation";
import { AlertStripeFeil, AlertStripeSuksess } from "nav-frontend-alertstriper";
import { postTlfnummer, slettTlfnummer } from "../../clients/apiClient";
import { HTTPError } from "../error/Error";
import endreIkon from "../../assets/img/Pencil.svg";
import slettIkon from "../../assets/img/Slett.svg";

interface Props {
  type: string;
  titleId: string;
  value?: string;
}

export interface OutboundTlfnummer {
  type: string;
  landskode: string;
  nummer: string;
}

const Telefonnummer = (props: Props) => {
  const { value, titleId, type } = props;
  const [endreLoading, settEndreLoading] = useState(false);
  const [slettLoading, settSlettLoading] = useState(false);
  const [endre, settEndre] = useState(false);
  const [error, settError] = useState();
  const [success, settSuccess] = useState();

  const initialFields = {
    tlfnummer: value
  };
  const formConfig = {
    landskode: {
      isRequired: "landskode er påkrevd"
    },
    tlfnummer: {
      isRequired: "Du må skrive inn telefonnummer",
      isMinLength: {
        message: "Telefonnmummeret må være 8 siffer",
        length: 8
      },
      isMaxLength: {
        message: "Telefonnmummeret må være maksimalt 16 siffer",
        length: 16
      }
    }
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

      console.log(outbound);
      settEndreLoading(true);
      postTlfnummer(outbound)
        .then(() => {
          settSuccess("Telefonnummeret ble oppdatert");
        })
        .catch((error: HTTPError) => {
          settError(`${error.code} - ${error.text}`);
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
        settSuccess("Telefonnummeret ble slettet");
      })
      .catch((error: HTTPError) => {
        settError(`${error.code} - ${error.text}`);
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
                  {endre ? (
                    <div>
                      <div className={"tlfnummer__chevron"}>
                        <NedChevron />
                      </div>
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

              {error && (
                <AlertStripeFeil>
                  <span>Oi! Noe gikk galt: {error}</span>
                </AlertStripeFeil>
              )}
              {success && (
                <AlertStripeSuksess>
                  <span>{success}</span>
                </AlertStripeSuksess>
              )}
            </>
          );
        }}
      </Validation>
    </Form>
  ) : null;
};

export default Telefonnummer;
