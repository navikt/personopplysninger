import React, { useState } from "react";
import { FormContext, FormValidation, ValidatorContext } from "calidation";
import { fetchPersonInfo, postKontonummer } from "clients/apiClient";
import { AlertStripeInfo } from "nav-frontend-alertstriper";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { FormattedHTMLMessage } from "react-intl";
import { OptionType } from "types/option";
import { Knapp } from "nav-frontend-knapper";
import { FormattedMessage } from "react-intl";
import { UtenlandskBankkonto } from "types/personalia";
import { electronicFormatIBAN, isValidBIC, isValidIBAN } from "ibantools";
import SelectLand from "components/felter/kodeverk/SelectLand";
import SelectValuta from "components/felter/kodeverk/SelectValuta";
import InputMedHjelpetekst from "components/felter/input-med-hjelpetekst/InputMedHjelpetekst";
import { UNKNOWN } from "utils/text";
import { useStore } from "providers/Provider";
import { PersonInfo } from "types/personInfo";
import Alert, { AlertType } from "../../../../../../components/alert/Alert";

interface Props {
  utenlandskbank?: UtenlandskBankkonto;
  settOpprettEllerEndre: (opprettEllerEndre: boolean) => void;
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
    swiftkode: string;
    valuta: string;
  };
}

const FEDWIRE = ["USA", "NZL", "AUS", "ZAF", "CAN"];
const BANKKODER: { [key: string]: string } = {
  USA: "FW",
  NZL: "NZ",
  AUS: "AU",
  ZAF: "ZA",
  CAN: "CC"
};

export const BANKKODE_MAX_LENGTH: { [key: string]: number } = {
  USA: 9,
  NZL: 6,
  AUS: 6,
  ZAF: 6,
  CAN: 6
};

const OpprettEllerEndreUtenlandsbank = (props: Props & InjectedIntlProps) => {
  const [loading, settLoading] = useState(false);
  const [alert, settAlert] = useState<AlertType | undefined>();
  const { settOpprettEllerEndre, utenlandskbank, intl } = props;
  const [, dispatch] = useStore();

  const initialValues = utenlandskbank
    ? {
        ...utenlandskbank,
        bickode: utenlandskbank.swiftkode,
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

  /*
    Validering av kontonummer: Det har blitt lagt inn spesialhåndtering av amerikanske
    kontonummer. Ta kontakt med økonomiavdelingen for ytterligere informasjon.
   */
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
          !fields.bankkode || landetBrukerBankkode(fields.land)
      },
      isNotIBAN: {
        message: intl.messages["validation.ikke.iban"],
        validateIf: ({ fields }: ValidatorContext) => harValgtUSA(fields.land)
      },
      isIBAN: {
        message: intl.messages["validation.iban.pakrevd"],
        validateIf: ({ fields }: ValidatorContext) =>
          fields.bickode && !harValgtUSA(fields.land)
      },
      isIBANCountryCompliant: {
        message: intl.messages["validation.iban.country"],
        validateIf: ({ fields }: ValidatorContext) =>
          isValidIBAN(fields.kontonummer)
      }
    },
    bickode: {
      isRequired: {
        message: intl.messages["validation.bic.pakrevd"],
        validateIf: ({ fields }: ValidatorContext) =>
          isValidIBAN(fields.kontonummer)
      },
      isLettersOrDigits: {
        message: intl.messages["validation.only.letters.and.digits"],
        validateIf: ({ fields }: ValidatorContext) =>
          isValidIBAN(fields.kontonummer) && !harValgtUSA(fields.land)
      },
      isBIC: {
        message: intl.messages["validation.bic.gyldig"],
        validateIf: ({ fields }: ValidatorContext) =>
          isValidIBAN(fields.kontonummer) && !harValgtUSA(fields.land)
      },
      isBICCountryCompliant: {
        message: intl.messages["validation.bic.country"],
        validateIf: ({ fields }: ValidatorContext) =>
          isValidBIC(fields.bickode) && !harValgtUSA(fields.land)
      }
    },
    retningsnummer: {
      isRequired: {
        message: "*",
        validateIf: ({ fields }: ValidatorContext) => harValgtUSA(fields.land)
      }
    },
    bankkode: {
      isRequired: {
        message: intl.messages["validation.bankkode.pakrevd"],
        validateIf: ({ fields }: ValidatorContext) => harValgtUSA(fields.land)
      },
      isNumber: {
        message: intl.messages["validation.only.digits"],
        validateIf: ({ fields }: ValidatorContext) => fields.bankkode
      },
      isBankkode: {
        message: ({ land, siffer }: { land: string; siffer: number }) =>
          intl.formatMessage(
            { id: "validation.bankkode.lengde" },
            { land, siffer }
          ),
        validateIf: ({ fields }: ValidatorContext) =>
          (landetBrukerBankkode(fields.land) &&
            !isValidIBAN(fields.kontonummer) &&
            !fields.bickode) ||
          harValgtUSA(fields.land)
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

  const onSuccess = () => {
    settOpprettEllerEndre(false);
  };

  const submitEndre = (c: FormContext) => {
    const { bickode, ...fields } = c.fields;
    const { isValid } = c;

    if (isValid) {
      const sendBICKode = bickode && !harValgtUSA(fields.land);
      const sendBankkode = fields.bankkode && !sendBICKode;
      const sendAdresse = !bickode;

      const outbound = {
        value: electronicFormatIBAN(fields.kontonummer),
        utenlandskKontoInformasjon: {
          landkode: fields.land.value,
          valuta: fields.valuta.value,
          ...(sendBICKode && {
            swift: bickode
          }),
          bank: {
            ...(sendAdresse && {
              adresseLinje1: fields.adresse1,
              adresseLinje2: fields.adresse2,
              adresseLinje3: fields.adresse3
            }),
            ...(sendBankkode && {
              kode: fields.bankkode
            }),
            navn: fields.banknavn
          }
        }
      };

      settLoading(true);
      postKontonummer(outbound)
        .then(getUpdatedData)
        .then(onSuccess)
        .catch((error: AlertType) => settAlert(error))
        .then(() => settLoading(false));
    }
  };

  // Utils
  const harValgtUSA = (land?: OptionType) =>
    land && land.value === "USA" ? true : false;
  const landetBrukerBankkode = (land: OptionType) =>
    land && FEDWIRE.includes(land.value) ? true : false;

  return (
    <FormValidation
      onSubmit={submitEndre}
      config={formConfig}
      initialValues={initialValues}
    >
      {({ errors, fields, submitted, isValid, setField }) => {
        const { land, kontonummer, bickode, retningsnummer } = fields;

        /*
           Bankkode er et spesialtilfelle
           for USA og noen få andre land.
         */
        const deaktiverBankkode =
          (!landetBrukerBankkode(land) ||
            isValidIBAN(kontonummer) ||
            bickode) &&
          !harValgtUSA(land);

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
                  label={intl.messages["felter.bankensland.label"]}
                  error={errors.land}
                  onChange={option => {
                    const bankkodeRetningsnummer = option
                      ? BANKKODER[option.value]
                      : null;

                    setField({
                      land: option,
                      ...(bankkodeRetningsnummer && {
                        retningsnummer: bankkodeRetningsnummer
                      })
                    });
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
                  maxLength={11}
                  submitted={submitted}
                  value={harValgtUSA(fields.land) ? `` : bickode}
                  disabled={harValgtUSA(fields.land)}
                  hjelpetekst={"utbetalinger.hjelpetekster.bic"}
                  label={intl.messages["felter.bic.bic.label"]}
                  onChange={value => setField({ bickode: value })}
                  error={errors.bickode}
                />
              </div>
              <div className="utbetalinger__input-box input--m">
                <div className="utbetalinger__bankkode-rad">
                  <div className="utbetalinger__bankkode-kolonne">
                    <InputMedHjelpetekst
                      disabled={true}
                      value={retningsnummer}
                      submitted={submitted}
                      label={intl.messages["felter.bankkode.label"]}
                      hjelpetekst={"utbetalinger.hjelpetekster.bankkode"}
                      error={errors.retningsnummer}
                      onChange={value => setField({ retningsnummer: value })}
                    />
                  </div>
                  <div className="utbetalinger__bankkode-kolonne">
                    <InputMedHjelpetekst
                      label={``}
                      submitted={submitted}
                      disabled={deaktiverBankkode}
                      value={deaktiverBankkode ? `` : fields.bankkode}
                      error={errors.bankkode}
                      onChange={value => setField({ bankkode: value })}
                      maxLength={land && BANKKODE_MAX_LENGTH[land.value]}
                    />
                  </div>
                </div>
              </div>
              <div className="utbetalinger__input-box input--m">
                <InputMedHjelpetekst
                  submitted={submitted}
                  value={fields.banknavn}
                  label={intl.messages["felter.banknavn.label"]}
                  onChange={value => setField({ banknavn: value })}
                  error={errors.banknavn}
                />
              </div>
              <div className="utbetalinger__adressefelter">
                <InputMedHjelpetekst
                  maxLength={34}
                  submitted={submitted}
                  disabled={fields.bickode}
                  value={fields.bickode ? `` : fields.adresse1}
                  label={intl.messages["felter.bankens.adresse.label"]}
                  onChange={value => setField({ adresse1: value })}
                  error={errors.adresse1}
                />
                <InputMedHjelpetekst
                  label={""}
                  maxLength={34}
                  disabled={fields.bickode}
                  value={fields.bickode ? `` : fields.adresse2}
                  submitted={submitted}
                  onChange={value => setField({ adresse2: value })}
                  error={errors.adresse2}
                />
                <InputMedHjelpetekst
                  label={""}
                  maxLength={34}
                  disabled={fields.bickode}
                  value={fields.bickode ? `` : fields.adresse3}
                  submitted={submitted}
                  onChange={value => setField({ adresse3: value })}
                  error={errors.adresse3}
                />
              </div>
            </div>
            <div className="utbetalinger__knapper">
              <div className="utbetalinger__knapp">
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
              <div className="utbetalinger__knapp">
                <Knapp
                  type={"flat"}
                  htmlType={"button"}
                  disabled={loading}
                  onClick={() => settOpprettEllerEndre(false)}
                >
                  <FormattedMessage id={"side.avbryt"} />
                </Knapp>
              </div>
            </div>
            {alert && <Alert {...alert} />}
          </>
        );
      }}
    </FormValidation>
  );
};

export default injectIntl(OpprettEllerEndreUtenlandsbank);
