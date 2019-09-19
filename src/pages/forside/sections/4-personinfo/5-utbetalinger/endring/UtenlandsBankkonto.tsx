import React, { useState } from "react";
import { FormContext, FormValidation, ValidatorContext } from "calidation";
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
import { electronicFormatIBAN, isValidIBAN } from "ibantools";
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
import { OptionType } from "../../../../../../types/option";

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

const FEDWIRE = ["USA", "IOT", "NZL", "AUS", "ZAF", "CAN"];

const OpprettEllerEndreUtenlandsbank = (props: Props & InjectedIntlProps) => {
  const [loading, settLoading] = useState(false);
  const [alert, settAlert] = useState<Alert | undefined>();
  const { onChangeSuccess, utenlandskbank, intl } = props;
  const [, dispatch] = useStore();

  const initialValues = utenlandskbank
    ? {
        ...utenlandskbank,
        kontonummer: utenlandskbank.kontonummer || utenlandskbank.iban,
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
    land: {
      isRequired: intl.messages["validation.land.pakrevd"]
    },
    kontonummer: {
      isRequired: {
        message: intl.messages["validation.kontonummer.pakrevd"]
      },
      isLettersOrDigits: {
        message: intl.messages["validation.only.letters.and.digits"],
        validateIf: ({ fields }: ValidatorContext) =>
          !fields.bankkode || brukerFedwire(fields.land)
      },
      isIBAN: {
        message: intl.messages["validation.iban.pakrevd"],
        validateIf: ({ fields }: ValidatorContext) =>
          fields.swiftkode && !brukerFedwire(fields.land)
      }
    },
    swiftkode: {
      isRequired: {
        message: intl.messages["validation.swift.pakrevd"],
        validateIf: ({ fields }: ValidatorContext) => isValidIBAN(fields.iban)
      },
      isLettersOrDigits: {
        message: intl.messages["validation.only.letters.and.digits"],
        validateIf: ({ fields }: ValidatorContext) =>
          !fields.bankkode || brukerFedwire(fields.land)
      },
      isBIC: {
        message: intl.messages["validation.swift.gyldig"],
        validateIf: ({ fields }: ValidatorContext) => isValidIBAN(fields.iban)
      }
    },
    bankkode: {
      isRequired: {
        message: intl.messages["validation.bankkode.pakrevd"],
        validateIf: ({ fields }: ValidatorContext) =>
          !fields.swiftkode && brukerFedwire(fields.land)
      }
    },
    banknavn: {
      isRequired: intl.messages["validation.banknavn.pakrevd"]
    },
    valuta: {
      isRequired: intl.messages["validation.valuta.pakrevd"]
    },
    adresse1: {},
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
        landkode: fields.land.value,
        value: electronicFormatIBAN(fields.kontonummer),
        valuta: fields.valuta.value,
        ...(fields.swiftkode && {
          swift: fields.swiftkode
        }),
        utenlandskKontoInformasjon: {
          bank: {
            ...(!fields.swiftkode && {
              adresseLinje1: fields.adresse1,
              adresseLinje2: fields.adresse2,
              adresseLinje3: fields.adresse3
            }),
            ...(!fields.swiftkode && {
              kode: fields.bankkode
            }),
            navn: fields.banknavn
          }
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

  const landkoder: { [key: string]: string } = {
    CAN: "CC",
    USA: "FW",
    AUS: "AU"
  };

  const brukerFedwire = (land: OptionType) =>
    land && FEDWIRE.includes(land.value);

  return (
    <FormValidation
      onSubmit={submitEndre}
      config={formConfig}
      initialValues={initialValues}
    >
      {({ errors, fields, submitted, isValid, setField }) => {
        const { land, kontonummer, swiftkode } = fields;
        return (
          <>
            <div className="utbetalinger__alert">
              <AlertStripeInfo>
                <FormattedHTMLMessage id="felter.utenlandskkonto.info" />
              </AlertStripeInfo>
            </div>
            <div className="utbetalinger__input-container">
              <div className="utbetalinger__input-box input--m">
                <SelectLand
                  submitted={submitted}
                  option={fields.land}
                  hjelpetekst={"utbetalinger.hjelpetekster.land"}
                  label={intl.messages["felter.bankensland.label"]}
                  error={errors.land}
                  onChange={value => {
                    console.log(value);
                    setField({ land: value });
                  }}
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
                  value={kontonummer}
                  hjelpetekst={"utbetalinger.hjelpetekster.kontonummer"}
                  label={intl.messages["felter.kontonummer.kontonummer.label"]}
                  onChange={value => setField({ kontonummer: value })}
                  error={errors.kontonummer}
                />
              </div>
              <div className="utbetalinger__input-box input--m">
                <InputMedHjelpetekst
                  submitted={submitted}
                  value={swiftkode}
                  disabled={land && land.value === "USA"}
                  hjelpetekst={"utbetalinger.hjelpetekster.bic"}
                  label={intl.messages["felter.swift.bic.label"]}
                  onChange={value => setField({ swiftkode: value })}
                  error={errors.swiftkode}
                />
              </div>
              <div className="utbetalinger__input-box input--m">
                <div className="utbetalinger__bankkode-rad">
                  <div className="utbetalinger__bankkode-kolonne">
                    <InputMedHjelpetekst
                      value={(land && landkoder[land.value]) || ``}
                      submitted={submitted}
                      disabled={true}
                      label={intl.messages["felter.bankkode.label"]}
                      hjelpetekst={"utbetalinger.hjelpetekster.bankkode"}
                      error={errors.bankkode ? " " : null}
                      onChange={value => {}}
                    />
                  </div>
                  <div className="utbetalinger__bankkode-kolonne">
                    <InputMedHjelpetekst
                      label={``}
                      submitted={submitted}
                      value={fields.bankkode}
                      disabled={!brukerFedwire(land) && fields.swiftkode}
                      onChange={value => setField({ bankkode: value })}
                      error={errors.bankkode}
                    />
                  </div>
                </div>
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
                  maxLength={34}
                  submitted={submitted}
                  disabled={fields.swiftkode}
                  value={fields.swiftkode ? `` : fields.adresse1}
                  label={intl.messages["felter.adresse.label"]}
                  hjelpetekst={"utbetalinger.hjelpetekster.adresse"}
                  onChange={value => setField({ adresse1: value })}
                  error={errors.adresse1}
                />
                <InputMedHjelpetekst
                  label={""}
                  maxLength={34}
                  disabled={fields.swiftkode}
                  value={fields.swiftkode ? `` : fields.adresse2}
                  submitted={submitted}
                  onChange={value => setField({ adresse2: value })}
                  error={errors.adresse2}
                />
                <InputMedHjelpetekst
                  label={""}
                  maxLength={34}
                  disabled={fields.swiftkode}
                  value={fields.swiftkode ? `` : fields.adresse3}
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
