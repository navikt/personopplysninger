import React from "react";
import { FormContext, Validation, ValidatorContext } from "calidation";
import { AlertStripeInfo } from "nav-frontend-alertstriper";
import { AlertStripeAdvarsel } from "nav-frontend-alertstriper";
import { InjectedIntlProps, injectIntl, FormattedMessage } from "react-intl";
import { FormattedHTMLMessage } from "react-intl";
import { OptionType } from "types/option";
import { UtenlandskBankkonto } from "types/personalia";
import { electronicFormatIBAN, isValidIBAN } from "ibantools";
import SelectLand from "components/felter/kodeverk/SelectLand";
import SelectValuta from "components/felter/kodeverk/SelectValuta";
import InputMedHjelpetekst from "components/felter/input-med-hjelpetekst/InputMedHjelpetekst";
import { UNKNOWN } from "utils/text";
import { harValgtBankkode, harValgtBic, harValgtUSA } from "./utils";
import { Radio, SkjemaGruppe } from "nav-frontend-skjema";
import { sjekkForFeil } from "../../../../../../utils/validators";

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

export const BIC = "BIC";
export const BANKKODE = "BANKKODE";
export const HVERKEN_BANKKODE_BIC = "HVERKEN_BANKKODE_BIC";
export const LAND_MED_BANKKODE = ["USA", "NZL", "AUS", "ZAF", "CAN"];

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
    Validering av kontonummer: Det har blitt lagt inn spesialhåndtering av amerikanske
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
      isRequired: intl.messages["validation.banknavn.pakrevd"]
    },
    kontonummer: {
      isRequired: {
        message: intl.messages["validation.kontonummer.pakrevd"]
      },
      isLettersOrDigits: {
        message: intl.messages["validation.only.letters.and.digits"],
        validateIf: ({ fields }: ValidatorContext) =>
          harValgtBankkode(fields.bankidentifier) ||
          harValgtBic(fields.bankidentifier) ||
          harValgtUSA(fields.land)
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
        validateIf: ({ fields }: ValidatorContext) => !harValgtUSA(fields.land)
      },
      isValidBankIdentifier: {
        message: intl.messages["validation.bankidentifier.valid"],
        validateIf: ({ fields }: ValidatorContext) => !harValgtUSA(fields.land)
      }
    },
    bickode: {
      isRequired: {
        message: intl.messages["validation.bic.pakrevd"],
        validateIf: ({ fields }: ValidatorContext) =>
          harValgtBic(fields.bankidentifier)
      },
      isLettersOrDigits: {
        message: intl.messages["validation.only.letters.and.digits"],
        validateIf: ({ fields }: ValidatorContext) =>
          harValgtBic(fields.bankidentifier)
      },
      isBIC: {
        message: intl.messages["validation.bic.gyldig"],
        validateIf: ({ fields }: ValidatorContext) =>
          harValgtBic(fields.bankidentifier)
      },
      isBICCountryCompliant: {
        message: intl.messages["validation.bic.country"],
        validateIf: ({ fields }: ValidatorContext) =>
          harValgtBic(fields.bankidentifier)
      }
    },
    retningsnummer: {
      isRequired: {
        message: "*",
        validateIf: ({ fields }: ValidatorContext) =>
          harValgtBankkode(fields.bankidentifier) || harValgtUSA(fields.land)
      }
    },
    bankkode: {
      isRequired: {
        message: intl.messages["validation.bankkode.pakrevd"],
        validateIf: ({ fields }: ValidatorContext) =>
          harValgtBankkode(fields.bankidentifier) || harValgtUSA(fields.land)
      },
      isNumber: {
        message: intl.messages["validation.only.digits"],
        validateIf: ({ fields }: ValidatorContext) =>
          harValgtBankkode(fields.bankidentifier) || harValgtUSA(fields.land)
      },
      isBankkode: {
        message: ({ land, siffer }: { land: string; siffer: number }) =>
          intl.formatMessage(
            { id: "validation.bankkode.lengde" },
            { land, siffer }
          ),
        validateIf: ({ fields }: ValidatorContext) =>
          harValgtBankkode(fields.bankidentifier) || harValgtUSA(fields.land)
      }
    },
    adresse1: {
      isRequired: {
        message: intl.messages["validation.adresse.pakrevd"],
        validateIf: ({ fields }: ValidatorContext) =>
          !harValgtBic(fields.bankidentifier) && !harValgtUSA(fields.land)
      }
    },
    adresse2: {},
    adresse3: {}
  };

  // Utils
  const landetBrukerBankkode = (land?: OptionType) =>
    land && LAND_MED_BANKKODE.includes(land.value) ? true : false;

  return (
    <Validation config={formConfig} initialValues={initialValues}>
      {({ errors, fields, submitted, setField }) => {
        const { land, kontonummer, bickode, retningsnummer } = fields;
        console.log(errors);
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

                const resetValgAvBankIdentifier =
                  (harValgtBankkode(fields.bankidentifier) &&
                    !landetBrukerBankkode(option)) ||
                  harValgtUSA(option);

                setField({
                  land: option,
                  ...(resetValgAvBankIdentifier && {
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
                  submitted={submitted}
                  value={fields.banknavn}
                  label={intl.messages["felter.banknavn.label"]}
                  onChange={value => setField({ banknavn: value })}
                  error={errors.banknavn}
                />
                <InputMedHjelpetekst
                  bredde={"L"}
                  submitted={submitted}
                  value={kontonummer}
                  hjelpetekst={"utbetalinger.hjelpetekster.kontonummer"}
                  label={intl.messages["felter.kontonummer.kontonummer.label"]}
                  onChange={value => setField({ kontonummer: value })}
                  error={errors.kontonummer}
                />
                {harValgtUSA(fields.land) ? (
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
                        bredde={"M"}
                        submitted={submitted}
                        value={fields.bankkode}
                        error={errors.bankkode}
                        onChange={value => setField({ bankkode: value })}
                        maxLength={land && BANKKODE_MAX_LENGTH[land.value]}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="utbetalinger__bankidentifier">
                    <SkjemaGruppe
                      feil={sjekkForFeil(submitted, errors.bankidentifier)}
                    >
                      <Radio
                        name={BIC}
                        checked={fields.bankidentifier === BIC}
                        label={intl.messages["felter.bankidentifier.bic"]}
                        onChange={e =>
                          setField({ bankidentifier: e.target.name })
                        }
                      />
                      {fields.bankidentifier === BIC && (
                        <InputMedHjelpetekst
                          bredde={"M"}
                          maxLength={11}
                          submitted={submitted}
                          value={bickode}
                          hjelpetekst={"utbetalinger.hjelpetekster.bic"}
                          label={intl.messages["felter.bic.label"]}
                          onChange={value => setField({ bickode: value })}
                          error={errors.bickode}
                        />
                      )}
                      {landetBrukerBankkode(fields.land) && (
                        <Radio
                          name={BANKKODE}
                          checked={fields.bankidentifier === BANKKODE}
                          label={
                            intl.messages["felter.bankidentifier.bankkode"]
                          }
                          onChange={e =>
                            setField({ bankidentifier: e.target.name })
                          }
                        />
                      )}
                      {fields.bankidentifier === BANKKODE && (
                        <div className="utbetalinger__bankkode-rad">
                          <div className="utbetalinger__bankkode-kolonne">
                            <InputMedHjelpetekst
                              disabled={true}
                              value={retningsnummer}
                              submitted={submitted}
                              label={intl.messages["felter.bankkode.label"]}
                              error={errors.retningsnummer}
                              hjelpetekst={
                                "utbetalinger.hjelpetekster.bankkode"
                              }
                              onChange={value =>
                                setField({ retningsnummer: value })
                              }
                            />
                          </div>
                          <div className="utbetalinger__bankkode-kolonne">
                            <InputMedHjelpetekst
                              label={``}
                              bredde={"M"}
                              submitted={submitted}
                              value={fields.bankkode}
                              error={errors.bankkode}
                              onChange={value => setField({ bankkode: value })}
                              maxLength={
                                land && BANKKODE_MAX_LENGTH[land.value]
                              }
                            />
                          </div>
                        </div>
                      )}
                      <Radio
                        name={HVERKEN_BANKKODE_BIC}
                        checked={fields.bankidentifier === HVERKEN_BANKKODE_BIC}
                        label={
                          landetBrukerBankkode(fields.land)
                            ? `${intl.messages["felter.bankidentifier.harikke.bicellerbankkode"]}`
                            : `${intl.messages["felter.bankidentifier.harikke.bic"]}`
                        }
                        onChange={e =>
                          setField({ bankidentifier: e.target.name })
                        }
                      />
                    </SkjemaGruppe>
                    {fields.bankidentifier === HVERKEN_BANKKODE_BIC && (
                      <div className="utbetalinger__alert">
                        <AlertStripeAdvarsel>
                          {landetBrukerBankkode(fields.land) ? (
                            <FormattedMessage id="felter.bankidentifier.harikke.bicellerbankkode.advarsel" />
                          ) : (
                            <FormattedMessage id="felter.bankidentifier.harikke.bic.advarsel" />
                          )}
                        </AlertStripeAdvarsel>
                      </div>
                    )}
                    {fields.bankidentifier && fields.bankidentifier !== BIC && (
                      <div className="utbetalinger__adressefelter">
                        <SkjemaGruppe
                          feil={sjekkForFeil(submitted, errors.adresse1)}
                        >
                          <InputMedHjelpetekst
                            bredde={"L"}
                            maxLength={34}
                            submitted={submitted}
                            value={fields.adresse1}
                            onChange={value => setField({ adresse1: value })}
                            label={
                              intl.messages["felter.bankens.adresse.label"]
                            }
                          />
                          <InputMedHjelpetekst
                            label={""}
                            bredde={"L"}
                            maxLength={34}
                            value={fields.adresse2}
                            submitted={submitted}
                            onChange={value => setField({ adresse2: value })}
                          />
                          <InputMedHjelpetekst
                            label={""}
                            bredde={"L"}
                            maxLength={34}
                            value={fields.adresse3}
                            submitted={submitted}
                            onChange={value => setField({ adresse3: value })}
                          />
                        </SkjemaGruppe>
                      </div>
                    )}
                  </div>
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
  const sendBICKode = harValgtBic(fields.bankidentifier);
  const sendBankkode = harValgtBankkode(fields.bankidentifier);
  const sendAdresse = !harValgtBic(fields.bankidentifier);

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
