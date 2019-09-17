import { FormattedHTMLMessage, FormattedMessage } from "react-intl";
import { Input, Select } from "nav-frontend-skjema";
import React, { useState } from "react";
import { Knapp } from "nav-frontend-knapper";
import { Form, FormContext, Validation } from "calidation";
import AlertStripe, { AlertStripeType } from "nav-frontend-alertstriper";
import {
  fetchPersonInfo,
  postTlfnummer
} from "../../../../../../../clients/apiClient";
import { HTTPError } from "../../../../../../../components/error/Error";
import { baseFormConfig, typeFormConfig } from "./Utils";
import avbrytIkon from "../../../../../../../assets/img/Back.svg";
import { Element, Normaltekst } from "nav-frontend-typografi";
import { NedChevron } from "nav-frontend-chevron";
import { Tlfnr } from "../../../../../../../types/personalia";
import SelectLandskode from "../../../../../../../components/felter/kodeverk/SelectLandskode";
import { sjekkForFeil } from "../../../../../../../utils/validators";
import { PersonInfo } from "../../../../../../../types/personInfo";
import { useStore } from "../../../../../../../providers/Provider";

interface Props {
  onCancelClick: () => void;
  onChangeSuccess: () => void;
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
  const [, dispatch] = useStore();

  const initialValues = {
    landskode: {
      label: "Norge",
      value: "+47"
    }
  };

  const getUpdatedData = () =>
    fetchPersonInfo().then(personInfo => {
      dispatch({
        type: "SETT_PERSON_INFO_RESULT",
        payload: personInfo as PersonInfo
      });
    });

  const submit = (e: FormContext) => {
    const { isValid, fields } = e;
    const { type, landskode, tlfnummer } = fields;

    if (isValid) {
      const outbound = {
        type,
        landskode: landskode.value,
        nummer: tlfnummer
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

  return (
    <>
      <div className="tlfnummer__divider" />
      <Form onSubmit={submit} className={"tlfnummer__rad-leggtil"}>
        <div className={"tlfnummer__container"}>
          <div>
            <Element>
              <FormattedMessage id="side.leggtil" />
            </Element>
            <div className={"tlfnummer__chevron"}>
              <NedChevron />
            </div>
          </div>
          <button
            type={"button"}
            onClick={props.onCancelClick}
            className={"kilde__lenke lenke"}
          >
            <Normaltekst>
              <FormattedHTMLMessage id="side.avbryt" />
              <span className="kilde__icon">
                <img src={avbrytIkon} alt="Ekstern lenke" />
              </span>
            </Normaltekst>
          </button>
        </div>
        <div className={"tlfnummer__container"}>
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
        </div>
        <div className={"tlfnummer__input-container"}>
          <Validation config={baseFormConfig} initialValues={initialValues}>
            {({ errors, fields, isValid, submitted, setField }) => {
              const tlfNummerMaxLength =
                fields.landskode && fields.landskode.value === "+47" ? 8 : 16;

              return (
                <>
                  <div className={"tlfnummer__input input--s"}>
                    <SelectLandskode
                      label={"Landkode"}
                      option={fields.landskode}
                      onChange={option => setField({ landskode: option })}
                      error={errors.landskode}
                      submitted={submitted}
                    />
                  </div>
                  <div className={"tlfnummer__input input--m"}>
                    <Input
                      type={"tel"}
                      bredde={"M"}
                      label={"Telefonnummer"}
                      value={fields.tlfnummer}
                      maxLength={tlfNummerMaxLength}
                      onChange={e => setField({ tlfnummer: e.target.value })}
                      feil={sjekkForFeil(submitted, errors.tlfnummer)}
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
                </>
              );
            }}
          </Validation>
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
