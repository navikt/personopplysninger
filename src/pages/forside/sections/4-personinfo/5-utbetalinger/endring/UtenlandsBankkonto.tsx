import React, { useState } from "react";
import { FormContext, FormValidation } from "calidation";
import {
  fetchPersonInfo,
  postKontonummer
} from "../../../../../../clients/apiClient";
import { HTTPError } from "../../../../../../components/error/Error";
import AlertStripe, {
  AlertStripeInfo,
  AlertStripeType
} from "nav-frontend-alertstriper";
import { Knapp } from "nav-frontend-knapper";
import { FormattedMessage } from "react-intl";
import { UtenlandskBankkonto } from "../../../../../../types/personalia";
import { electronicFormatIBAN } from "ibantools";
import SelectLand from "../../../../../../components/felter/kodeverk/SelectLand";
import SelectValuta from "../../../../../../components/felter/kodeverk/SelectValuta";
import InputMedHjelpetekst from "../../../../../../components/felter/input-med-hjelpetekst/InputMedHjelpetekst";
import { UNKNOWN } from "../../../../../../utils/text";
import { useStore } from "../../../../../../providers/Provider";
import { PersonInfo } from "../../../../../../types/personInfo";
import {
  InjectedIntlProps,
  injectIntl,
  FormattedHTMLMessage
} from "react-intl";

interface Props {
  utenlandskbank?: UtenlandskBankkonto;
  onChangeSuccess: () => void;
}

interface Alert {
  type: AlertStripeType;
  melding: string;
}

export interface OutboundUtenlandsbankonto {
  value: string;
  utenlandskKontoInformasjon: {
    bank: {
      adresseLinje1: string;
      adresseLinje2: string;
      adresseLinje3: string;
      kode: string;
      navn: string;
    };
    landkode: string;
    swift: string;
    valuta: string;
  };
}

const OpprettEllerEndreUtenlandsbank = (props: Props & InjectedIntlProps) => {
  const [loading, settLoading] = useState(false);
  const [alert, settAlert] = useState<Alert | undefined>();
  const { onChangeSuccess, utenlandskbank, intl } = props;
  const [, dispatch] = useStore();

  const initialValues = utenlandskbank
    ? {
        ...utenlandskbank,
        iban: utenlandskbank.kontonummer || utenlandskbank.iban,
        land: {
          label: utenlandskbank.land.toUpperCase(),
          value: UNKNOWN
        },
        valuta: {
          label: utenlandskbank.valuta,
          value: UNKNOWN
        }
      }
    : {};

  const formConfig = {
    iban: {
      isRequired: intl.messages["validation.kontonummer.iban.pakrevd"],
      isIBAN: intl.messages["validation.iban.pakrevd"]
    },
    bankkode: {
      isRequired: intl.messages["validation.bankkode.pakrevd"]
    },
    banknavn: {
      isRequired: intl.messages["validation.banknavn.pakrevd"]
    },
    land: {
      isRequired: intl.messages["validation.land.pakrevd"]
    },
    swiftkode: {
      isRequired: intl.messages["validation.swift.pakrevd"],
      isBIC: intl.messages["validation.swift.gyldig"]
    },
    valuta: {
      isRequired: intl.messages["validation.valuta.pakrevd"]
    },
    adresse1: {
      isRequired: intl.messages["validation.adresse.pakrevd"]
    },
    adresse2: {},
    adresse3: {}
  };

  const getUpdatedData = () =>
    fetchPersonInfo().then(personInfo => {
      dispatch({
        type: "SETT_PERSON_INFO_RESULT",
        payload: personInfo as PersonInfo
      });
    });

  const submitEndre = (c: FormContext) => {
    const { isValid, fields } = c;

    if (isValid) {
      const outbound = {
        value: electronicFormatIBAN(fields.iban),
        utenlandskKontoInformasjon: {
          bank: {
            adresseLinje1: fields.adresse1,
            adresseLinje2: fields.adresse2,
            adresseLinje3: fields.adresse3,
            kode: fields.bankkode,
            navn: fields.banknavn
          },
          landkode: fields.land.value,
          valuta: fields.valuta.value,
          swift: fields.swiftkode
        }
      };

      settLoading(true);
      postKontonummer(outbound)
        .then(getUpdatedData)
        .then(onChangeSuccess)
        .catch((error: HTTPError) => {
          settLoading(false);
          settAlert({
            type: "feil",
            melding: `${error.code} - ${error.text}`
          });
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
            <div className="utbetalinger__alert">
              <AlertStripeInfo>
                <FormattedHTMLMessage id="felter.utenlandskkonto.info" />
              </AlertStripeInfo>
            </div>
            <div className="utbetalinger__input-container">
              <div className="utbetalinger__input-box input--m">
                <InputMedHjelpetekst
                  submitted={submitted}
                  value={fields.iban}
                  hjelpetekst={"utbetalinger.hjelpetekster.iban"}
                  label={intl.messages["felter.kontonummer.iban.label"]}
                  onChange={value => setField({ iban: value })}
                  error={errors.iban}
                />
              </div>
              <div className="utbetalinger__input-box input--m">
                <InputMedHjelpetekst
                  submitted={submitted}
                  value={fields.swiftkode}
                  hjelpetekst={"utbetalinger.hjelpetekster.bic"}
                  label={intl.messages["felter.swift.bic.label"]}
                  onChange={value => setField({ swiftkode: value })}
                  error={errors.swiftkode}
                />
              </div>
              <div className="utbetalinger__input-box input--m">
                <SelectLand
                  submitted={submitted}
                  option={fields.land}
                  hjelpetekst={"utbetalinger.hjelpetekster.land"}
                  label={intl.messages["felter.bankensland.label"]}
                  onChange={value => setField({ land: value })}
                  error={errors.land}
                />
              </div>
              <div className="utbetalinger__input-box input--m">
                <SelectValuta
                  submitted={submitted}
                  option={fields.valuta}
                  label={intl.messages["felter.valuta.label"]}
                  hjelpetekst={"utbetalinger.hjelpetekster.valuta"}
                  onChange={value => setField({ valuta: value })}
                  error={errors.valuta}
                />
              </div>
              <div className="utbetalinger__input-box input--m">
                <InputMedHjelpetekst
                  submitted={submitted}
                  value={fields.bankkode}
                  label={intl.messages["felter.bankkode.label"]}
                  hjelpetekst={"utbetalinger.hjelpetekster.bankkode"}
                  onChange={value => setField({ bankkode: value })}
                  error={errors.bankkode}
                />
              </div>
              <div className="utbetalinger__input-box input--m">
                <InputMedHjelpetekst
                  submitted={submitted}
                  value={fields.banknavn}
                  label={intl.messages["felter.banknavn.label"]}
                  hjelpetekst={"utbetalinger.hjelpetekster.banknavn"}
                  onChange={value => setField({ banknavn: value })}
                  error={errors.banknavn}
                />
              </div>
              <div className="utbetalinger__adressefelter">
                <InputMedHjelpetekst
                  submitted={submitted}
                  value={fields.adresse1}
                  label={intl.messages["felter.adresse.label"]}
                  hjelpetekst={"utbetalinger.hjelpetekster.adresse"}
                  onChange={value => setField({ adresse1: value })}
                  error={errors.adresse1}
                />
                <InputMedHjelpetekst
                  label={""}
                  value={fields.adresse2}
                  submitted={submitted}
                  onChange={value => setField({ adresse2: value })}
                  error={errors.adresse2}
                />
                <InputMedHjelpetekst
                  label={""}
                  value={fields.adresse3}
                  submitted={submitted}
                  onChange={value => setField({ adresse3: value })}
                  error={errors.adresse3}
                />
              </div>
            </div>
            <div className="utbetalinger__sentrert-knapp">
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

export default injectIntl(OpprettEllerEndreUtenlandsbank);
