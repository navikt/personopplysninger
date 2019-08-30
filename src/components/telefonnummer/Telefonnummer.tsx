import { Element, Normaltekst } from "nav-frontend-typografi";
import { FormattedMessage } from "react-intl";
import { Input } from "nav-frontend-skjema";
import React, { useState } from "react";
import { NedChevron } from "nav-frontend-chevron";
import { Knapp } from "nav-frontend-knapper";
import { Form, FormContext, Validation } from "calidation";
import { AlertStripeFeil, AlertStripeSuksess } from "nav-frontend-alertstriper";
import { postTlfnummer } from "../../clients/apiClient";
import { HTTPError } from "../error/Error";
import endreIkon from "../../assets/img/Pencil.svg";

interface Props {
  type: string;
  titleId: string;
  value?: string;
}

export interface OutboundTlfnummer {
  type: string;
  landkode: string;
  tlfnummer: string;
}

const Telefonnummer = (props: Props) => {
  const { value, titleId, type } = props;
  const [endreLoading, settEndreLoading] = useState(false);
  const [slettLoading, settSlettLoading] = useState(false);
  const [error, settError] = useState();
  const [success, settSuccess] = useState();

  const [endre, settEndre] = useState(false);

  const initialFields = {
    tlfnummer: value
  };
  const formConfig = {
    landkode: {
      isRequired: "Landkode er påkrevd"
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

  const send = (e: FormContext) => {
    const { isValid, fields } = e;
    const { landkode, tlfnummer } = fields;

    if (isValid) {
      const outbound = {
        type,
        landkode,
        tlfnummer
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
  return value ? (
    <Form onSubmit={send}>
      <Validation config={formConfig} initialValues={initialFields}>
        {({ errors, fields, submitted, setField }) => {
          return (
            <>
              <div className={"tlfnummer__container"}>
                <div>
                  <Element>
                    <FormattedMessage id={titleId} />
                  </Element>
                  <Normaltekst>{value}</Normaltekst>
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
                          <img alt={"Endre ikon"} src={endreIkon} />
                        </div>
                      </>
                    )}
                  </Knapp>
                  <Knapp
                    type={"flat"}
                    htmlType={"button"}
                    autoDisableVedSpinner={true}
                    spinner={slettLoading}
                    onClick={() => settSlettLoading(true)}
                  >
                    <FormattedMessage id={"side.slett"} />
                  </Knapp>
                </div>
              </div>
              {endre && (
                <div>
                  <div className={"tlfnummer__endrestil"}>
                    <div>
                      <FormattedMessage id={"side.endretil"} />
                    </div>
                    <div className={"tlfnummer__chevron"}>
                      <NedChevron />
                    </div>
                  </div>
                  <div className={"tlfnummer__input-container"}>
                    <div className={"tlfnummer__input"}>
                      <Input
                        label={"Landkode"}
                        value={fields.landkode}
                        onChange={e => setField({ landkode: e.target.value })}
                        feil={
                          submitted && errors.landkode
                            ? { feilmelding: errors.landkode }
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
                  {error && (
                    <AlertStripeFeil>
                      Oi! Noe gikk galt: {error}
                    </AlertStripeFeil>
                  )}
                  {success && (
                    <AlertStripeSuksess>{success}</AlertStripeSuksess>
                  )}
                  <hr className="box__linje-bred" />
                </div>
              )}
            </>
          );
        }}
      </Validation>
    </Form>
  ) : null;
};

export default Telefonnummer;
