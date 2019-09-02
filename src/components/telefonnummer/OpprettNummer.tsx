import { FormattedHTMLMessage, FormattedMessage } from "react-intl";
import { Input, Select } from "nav-frontend-skjema";
import React, { useState } from "react";
import { Knapp } from "nav-frontend-knapper";
import { Form, FormContext, Validation } from "calidation";
import AlertStripe, { AlertStripeType } from "nav-frontend-alertstriper";
import { postTlfnummer } from "../../clients/apiClient";
import { HTTPError } from "../error/Error";
import { baseFormConfig, typeFormConfig } from "./Utils";
import avbrytIkon from "../../assets/img/Back.svg";
import { Element, Normaltekst } from "nav-frontend-typografi";
import { NedChevron } from "nav-frontend-chevron";
import { Tlfnr } from "../../types/personalia";
import Retningsnumre from "../retningsnumre/Retningsnumre";

interface Props {
  onCancelClick: () => void;
  onChangeSuccess: (type: string, tlfnummer: string) => void;
  tlfnr?: Tlfnr;
}

interface Alert {
  type: AlertStripeType;
  melding: string;
}

const OpprettTelefonnummer = (props: Props) => {
  const [endreLoading, settEndreLoading] = useState(false);
  const [alert, settAlert] = useState<Alert | undefined>();
  const { tlfnr, onChangeSuccess } = props;

  const submitEndre = (e: FormContext) => {
    const { isValid, fields } = e;
    const { type, landskode, tlfnummer } = fields;

    if (isValid) {
      const outbound = {
        type,
        landskode,
        nummer: tlfnummer
      };

      settEndreLoading(true);
      postTlfnummer(outbound)
        .then(() => {
          onChangeSuccess(type, tlfnummer);
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
    <>
      <div className="tlfnummer__divider" />
      <Form onSubmit={submitEndre} className={"tlfnummer__rad-leggtil"}>
        <div className={"tlfnummer__container"}>
          <div>
            <Element>
              <FormattedMessage id="side.leggtil" />
            </Element>
            <div className={"tlfnummer__chevron"}>
              <NedChevron />
            </div>
            <Validation config={typeFormConfig}>
              {({ errors, fields, submitted, setField }) => {
                return (
                  <Select
                    label={"Type"}
                    value={fields.type}
                    onChange={e => setField({ type: e.target.value })}
                    bredde={"s"}
                    feil={
                      submitted && errors.type
                        ? { feilmelding: errors.type }
                        : undefined
                    }
                  >
                    <option>Velg type</option>
                    {(!tlfnr || (tlfnr && !tlfnr.mobil)) && (
                      <option value="MOBIL">Mobil</option>
                    )}
                    {(!tlfnr || (tlfnr && !tlfnr.jobb)) && (
                      <option value="ARBEID">Arbeid</option>
                    )}
                    {(!tlfnr || (tlfnr && !tlfnr.privat)) && (
                      <option value="HJEM">Hjem</option>
                    )}
                  </Select>
                );
              }}
            </Validation>
            <div className={"tlfnummer__input-container"}>
              <Validation config={baseFormConfig}>
                {({ errors, fields, submitted, setField }) => {
                  return (
                    <>
                      <div className={"tlfnummer__input"}>
                        <Retningsnumre
                          label={"Landskode"}
                          value={fields.landkode}
                          onChange={value => setField({ landskode: value })}
                          error={errors.landskode}
                          submitted={submitted}
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
                    </>
                  );
                }}
              </Validation>
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
      </Form>
    </>
  );
};

export default OpprettTelefonnummer;
