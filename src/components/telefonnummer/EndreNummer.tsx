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
import avbrytIkon from "../../assets/img/Back.svg";
import slettIkon from "../../assets/img/Slett.svg";
import { baseFormConfig } from "./Utils";
import Retningsnumre from "../kodeverk/Retningsnumre";
import { formatTelefonnummer } from "../../utils/formattering";

interface Props {
  type: "MOBIL" | "HJEM" | "ARBEID";
  titleId: string;
  onDeleteSuccess: (type: string) => void;
  onChangeSuccess: (type: string, tlfnummer: string) => void;
  currentLandskode: string;
  currentTlfnummer?: string;
}

interface Alert {
  type: AlertStripeType;
  melding: string;
}

const EndreTelefonnummer = (props: Props) => {
  const [endreLoading, settEndreLoading] = useState(false);
  const [slettLoading, settSlettLoading] = useState(false);
  const [endre, settEndre] = useState(false);
  const [alert, settAlert] = useState<Alert | undefined>();

  const {
    type,
    titleId,
    currentLandskode,
    currentTlfnummer,
    onChangeSuccess,
    onDeleteSuccess
  } = props;

  const initialValues = {
    landskode: currentLandskode,
    tlfnummer: currentTlfnummer
  };

  const submitEndre = (e: FormContext) => {
    const { isValid, fields } = e;

    if (isValid) {
      const outbound = {
        type,
        landskode: fields.landskode,
        nummer: fields.tlfnummer
      };

      settEndreLoading(true);
      postTlfnummer(outbound)
        .then(() => {
          settEndre(false);
          onChangeSuccess(type, fields.tlfnummer);
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
    if (!currentTlfnummer) {
      return;
    }

    const outbound = {
      type,
      landskode: currentLandskode,
      nummer: currentTlfnummer
    };

    settSlettLoading(true);
    slettTlfnummer(outbound)
      .then(() => {
        settEndre(false);
        onDeleteSuccess(type);
      })
      .catch((error: HTTPError) => {
        onDeleteSuccess(type);
        settAlert({
          type: "feil",
          melding: `${error.code} - ${error.text}`
        });
      })
      .then(() => {
        settSlettLoading(false);
      });
  };

  return currentTlfnummer ? (
    <Form onSubmit={submitEndre} className={"tlfnummer__rad"}>
      <Validation config={baseFormConfig} initialValues={initialValues}>
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
                  {!endre && (
                    <Normaltekst>
                      {formatTelefonnummer(
                        type,
                        currentLandskode,
                        currentTlfnummer
                      )}
                    </Normaltekst>
                  )}
                </div>
                <div className={"tlfnummer__knapper"}>
                  <Knapp
                    type={"flat"}
                    htmlType={"button"}
                    className={"tlfnummer__knapp"}
                    onClick={() => settEndre(!endre)}
                  >
                    {endre ? (
                      <>
                        <div className={"tlfnummer__knapp-tekst"}>
                          <FormattedMessage id={"side.avbryt"} />
                        </div>
                        <div className={"tlfnummer__knapp-ikon"}>
                          <img alt={"Avbryt"} src={avbrytIkon} />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className={"tlfnummer__knapp-tekst"}>
                          <FormattedMessage id={"side.endre"} />
                        </div>
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
                    <div className={"tlfnummer__knapp-tekst"}>
                      <FormattedMessage id={"side.slett"} />
                    </div>
                    <div className={"tlfnummer__knapp-ikon"}>
                      <img alt={"Slett telefonnummer"} src={slettIkon} />
                    </div>
                  </Knapp>
                </div>
              </div>
              {endre && (
                <div>
                  <div className={"tlfnummer__input-container"}>
                    <div className={"tlfnummer__input input--s"}>
                      <Retningsnumre
                        label={"Landkode"}
                        value={fields.landskode}
                        onChange={value => setField({ landskode: value })}
                        error={errors.landskode}
                        submitted={submitted}
                      />
                    </div>
                    <div className={"tlfnummer__input input--m"}>
                      <Input
                        label={"Telefonnummer"}
                        value={fields.tlfnummer}
                        bredde={"M"}
                        type={"tel"}
                        maxLength={fields.landskode === "+47" ? 8 : 16}
                        onChange={e => setField({ tlfnummer: e.target.value })}
                        feil={
                          submitted && errors.tlfnummer
                            ? { feilmelding: errors.tlfnummer }
                            : undefined
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
              )}
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
  ) : null;
};

export default EndreTelefonnummer;
