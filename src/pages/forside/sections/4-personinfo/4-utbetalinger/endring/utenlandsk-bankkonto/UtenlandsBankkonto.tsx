import React from "react";
import { FormContext, Validation, ValidatorContext } from "calidation";
import { AlertStripeInfo } from "nav-frontend-alertstriper";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { FormattedHTMLMessage } from "react-intl";
import { UtenlandskBankkonto } from "types/personalia";
import { electronicFormatIBAN, isValidIBAN } from "ibantools";
import SelectLand from "components/felter/kodeverk/SelectLand";
import SelectValuta from "components/felter/kodeverk/SelectValuta";
import InputMedHjelpetekst from "components/felter/input-med-hjelpetekst/InputMedHjelpetekst";
import { UNKNOWN } from "utils/text";
import { brukerBankkode, validerBankkode, validerBic } from "../utils";
import { harUtfylt, harValgtBic, harValgtUSA } from "../utils";
import AmerikanskKonto from "./AmerikanskKonto";
import LandMedBankkode from "./LandMedBankkode";
import LandUtenBankkode from "./LandUtenBankkode";

interface Props {
  utenlandskbank?: UtenlandskBankkonto;
}

export interface OutboundUtenlandsbankonto {
  value: string;
  utenlandskKontoInformasjon: {
    landkode: string;
    valuta: string;
    swift?: string;
    bank: {
      adresseLinje1?: string;
      adresseLinje2?: string;
      adresseLinje3?: string;
      kode?: string;
      navn: string;
    };
  };
}

export const BIC = "BIC";
export const UTEN_BIC = "UTEN_BIC";
export const LAND_MED_BANKKODE = ["USA", "NZL", "AUS", "ZAF", "CAN"];
export const BANKKODER: { [key: string]: string } = {
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
  const { utenlandskbank, intl } = props;

  /*
    Initiate form
   */
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
    Validering av kontonummer: Spesialhåndtering av amerikanske
    kontonummer. Ta kontakt med økonomiavdelingen for ytterligere informasjon.
   */
  const formConfig = {
    land: {
      isRequired: intl.messages["validation.land.pakrevd"]
    },
    valuta: {
      isRequired: intl.messages["validation.valuta.pakrevd"]
    },
    banknavn: {
      isRequired: intl.messages["validation.banknavn.pakrevd"],
      isBlacklistedCommon: intl.messages["validation.svarteliste.felles"]
    },
    kontonummer: {
      isRequired: {
        message: intl.messages["validation.kontonummer.pakrevd"]
      },
      isLettersOrDigits: {
        message: intl.messages["validation.only.letters.and.digits"],
        validateIf: ({ fields }: ValidatorContext) =>
          harValgtBic(fields.bankidentifier) || harValgtUSA(fields.land)
      },
      isNotIBAN: {
        message: intl.messages["validation.ikke.iban"],
        validateIf: ({ fields }: ValidatorContext) => harValgtUSA(fields.land)
      },
      isIBANCountryCompliant: {
        message: intl.messages["validation.iban.country"],
        validateIf: ({ fields }: ValidatorContext) =>
          isValidIBAN(fields.kontonummer)
      }
    },
    bankidentifier: {
      isRequired: {
        message: intl.messages["validation.bankidentifier.pakrevd"],
        validateIf: ({ fields }: ValidatorContext) =>
          !brukerBankkode(fields.land)
      },
      isValidBankIdentifier: {
        message: intl.messages["validation.bankidentifier.valid"],
        validateIf: ({ fields }: ValidatorContext) =>
          harUtfylt(fields.bankidentifier)
      }
    },
    bickode: {
      isRequired: {
        message: intl.messages["validation.bic.pakrevd"],
        validateIf: ({ fields }: ValidatorContext) => validerBic(fields)
      },
      isLettersOrDigits: {
        message: intl.messages["validation.only.letters.and.digits"],
        validateIf: ({ fields }: ValidatorContext) => validerBic(fields)
      },
      isBIC: {
        message: intl.messages["validation.bic.gyldig"],
        validateIf: ({ fields }: ValidatorContext) => validerBic(fields)
      },
      isBICCountryCompliant: {
        message: intl.messages["validation.bic.country"],
        validateIf: ({ fields }: ValidatorContext) => validerBic(fields)
      }
    },
    retningsnummer: {
      isRequired: {
        message: "*",
        validateIf: ({ fields }: ValidatorContext) => validerBankkode(fields)
      }
    },
    bankkode: {
      isRequired: {
        message: intl.messages["validation.bankkode.pakrevd"],
        validateIf: ({ fields }: ValidatorContext) => validerBankkode(fields)
      },
      isNumber: {
        message: intl.messages["validation.only.digits"],
        validateIf: ({ fields }: ValidatorContext) => validerBankkode(fields)
      },
      isBankkode: {
        message: ({ land, siffer }: { land: string; siffer: number }) =>
          intl.formatMessage(
            { id: "validation.bankkode.lengde" },
            { land, siffer }
          ),
        validateIf: ({ fields }: ValidatorContext) => validerBankkode(fields)
      }
    },
    adresse1: {},
    adresse2: {},
    adresse3: {}
  };

  return (
    <Validation config={formConfig} initialValues={initialValues}>
      {({ errors, fields, submitted, setField }) => {
        return (
          <>
            <div className="utbetalinger__alert">
              <AlertStripeInfo>
                <FormattedHTMLMessage id="felter.utenlandskkonto.info" />
              </AlertStripeInfo>
            </div>
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
                  ...(brukerBankkode(option) && {
                    bankidentifier: undefined
                  }),
                  ...(bankkodeRetningsnummer && {
                    retningsnummer: bankkodeRetningsnummer
                  })
                });
              }}
            />
            {fields.land && (
              <>
                <SelectValuta
                  submitted={submitted}
                  option={fields.valuta}
                  label={intl.messages["felter.valuta.label"]}
                  hjelpetekst={"utbetalinger.hjelpetekster.valuta"}
                  onChange={value => setField({ valuta: value })}
                  error={errors.valuta}
                />
                <InputMedHjelpetekst
                  bredde={"L"}
                  maxLength={34}
                  submitted={submitted}
                  value={fields.banknavn}
                  label={intl.messages["felter.banknavn.label"]}
                  onChange={value => setField({ banknavn: value })}
                  error={errors.banknavn}
                />
                <InputMedHjelpetekst
                  bredde={"L"}
                  submitted={submitted}
                  value={fields.kontonummer}
                  hjelpetekst={"utbetalinger.hjelpetekster.kontonummer"}
                  label={intl.messages["felter.kontonummer.kontonummer.label"]}
                  onChange={value => setField({ kontonummer: value })}
                  error={errors.kontonummer}
                />
                {harValgtUSA(fields.land) ? (
                  <AmerikanskKonto
                    submitted={submitted}
                    fields={fields}
                    errors={errors}
                    setField={setField}
                  />
                ) : brukerBankkode(fields.land) ? (
                  <LandMedBankkode
                    submitted={submitted}
                    fields={fields}
                    errors={errors}
                    setField={setField}
                  />
                ) : (
                  <LandUtenBankkode
                    submitted={submitted}
                    fields={fields}
                    errors={errors}
                    setField={setField}
                  />
                )}
              </>
            )}
          </>
        );
      }}
    </Validation>
  );
};

export const setOutboundUtenlandsbankonto = (c: FormContext) => {
  const { bickode, ...fields } = c.fields;

  const sendBankkode = validerBankkode(c.fields);
  const sendBICKode = validerBic(c.fields);
  const sendAdresse = !(
    !brukerBankkode(fields.land) && harValgtBic(fields.bankidentifier)
  );

  return {
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
};

export default injectIntl(OpprettEllerEndreUtenlandsbank);
