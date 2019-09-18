import { Element, Normaltekst } from "nav-frontend-typografi";
import { FormattedMessage } from "react-intl";
import { Input } from "nav-frontend-skjema";
import React, { useState } from "react";
import { NedChevron } from "nav-frontend-chevron";
import { Knapp } from "nav-frontend-knapper";
import { FormContext, FormValidation, ValidatorContext } from "calidation";
import AlertStripe, { AlertStripeType } from "nav-frontend-alertstriper";
import {
  fetchPersonInfo,
  postTlfnummer,
  slettTlfnummer
} from "../../../../../../../clients/apiClient";
import { HTTPError } from "../../../../../../../components/error/Error";
import endreIkon from "../../../../../../../assets/img/Pencil.svg";
import avbrytIkon from "../../../../../../../assets/img/Back.svg";
import slettIkon from "../../../../../../../assets/img/Slett.svg";
import SelectLandskode from "../../../../../../../components/felter/kodeverk/SelectLandskode";
import { formatTelefonnummer } from "../../../../../../../utils/formattering";
import { OptionType } from "../../../../../../../types/option";
import { PersonInfo } from "../../../../../../../types/personInfo";
import { useStore } from "../../../../../../../providers/Provider";
import { InjectedIntlProps, injectIntl } from "react-intl";

export interface OutboundTlfnummer {
  type: string;
  landskode: string;
  nummer: string;
}

interface Props {
  type: "MOBIL" | "HJEM" | "ARBEID";
  titleId: string;
  onDeleteSuccess: () => void;
  onChangeSuccess: () => void;
  currentLandskode: OptionType;
  currentTlfnummer?: string;
}

interface Alert {
  type: AlertStripeType;
  melding: string;
}

const EndreTelefonnummer = (props: Props & InjectedIntlProps) => {
  const { type, titleId, currentLandskode, currentTlfnummer, intl } = props;
  const [endreLoading, settEndreLoading] = useState(false);
  const [slettLoading, settSlettLoading] = useState(false);
  const [endre, settEndre] = useState(false);
  const [alert, settAlert] = useState<Alert | undefined>();
  const [, dispatch] = useStore();

  const initialValues = {
    tlfnummer: currentTlfnummer,
    landskode: currentLandskode
  };

  const formConfig = {
    landskode: {
      isRequired: intl.messages["validation.retningsnr.pakrevd"]
    },
    tlfnummer: {
      isRequired: intl.messages["validation.tlfnr.pakrevd"],
      isNumber: intl.messages["validation.tlfnr.siffer"],
      isNorwegianTelephoneNumber: {
        message: intl.messages["validation.tlfnr.norske"],
        validateIf: ({ fields }: ValidatorContext) =>
          fields.landskode && fields.landskode.value === "+47"
      },
      isMaxLength: {
        message: intl.messages["validation.tlfnr.makslengde"],
        length: 16
      }
    }
  };

  const onChangeSuccess = () => {
    props.onChangeSuccess();
    settEndre(false);
  };

  const onDeleteSuccess = () => {
    props.onDeleteSuccess();
    settEndre(false);
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

    if (isValid) {
      const outbound = {
        type,
        landskode: fields.landskode.value,
        nummer: fields.tlfnummer
      };

      settEndreLoading(true);
      postTlfnummer(outbound)
        .then(getUpdatedData)
        .then(onChangeSuccess)
        .catch((error: HTTPError) => {
          settEndreLoading(false);
          settAlert({
            type: "feil",
            melding: `${error.code} - ${error.text}`
          });
        });
    }
  };

  const submitSlett = () => {
    if (!currentTlfnummer) {
      return;
    }

    const outbound = {
      type,
      landskode: currentLandskode.value,
      nummer: currentTlfnummer
    };

    settSlettLoading(true);
    slettTlfnummer(outbound)
      .then(getUpdatedData)
      .then(onDeleteSuccess)
      .catch((error: HTTPError) => {
        settSlettLoading(false);
        settAlert({
          type: "feil",
          melding: `${error.code} - ${error.text}`
        });
      });
  };

  return currentTlfnummer ? (
    <FormValidation
      config={formConfig}
      onSubmit={submitEndre}
      className={"tlfnummer__rad"}
      initialValues={initialValues}
    >
      {({ errors, fields, submitted, isValid, setField }) => {
        const tlfNummerMaxLength =
          fields.landskode && fields.landskode.value === "+47" ? 8 : 16;

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
                    {`${currentLandskode.value} ${formatTelefonnummer(
                      type,
                      currentLandskode,
                      currentTlfnummer
                    )}`}
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
                    <SelectLandskode
                      option={fields.landskode}
                      label={intl.messages["felter.landkode.label"]}
                      onChange={option => setField({ landskode: option })}
                      error={errors.landskode}
                      submitted={submitted}
                    />
                  </div>
                  <div className={"tlfnummer__input input--m"}>
                    <Input
                      type={"tel"}
                      bredde={"M"}
                      value={fields.tlfnummer}
                      label={intl.messages["felter.tlfnr.label"]}
                      onChange={e => setField({ tlfnummer: e.target.value })}
                      maxLength={tlfNummerMaxLength}
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
                      disabled={submitted && !isValid}
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
    </FormValidation>
  ) : null;
};

export default injectIntl(EndreTelefonnummer);
