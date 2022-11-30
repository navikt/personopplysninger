import React from "react";
import { FormContext, Validation, ValidatorContext } from "calidation";
import { FormattedMessage, useIntl } from "react-intl";

import { UtenlandskBankkonto } from "types/personalia";
import { electronicFormatIBAN, isValidIBAN } from "ibantools";
import SelectLand from "components/felter/select-kodeverk/SelectLand";
import SelectValuta from "components/felter/select-kodeverk/SelectValuta";
import InputMedHjelpetekst from "components/felter/input-med-hjelpetekst/InputMedHjelpetekst";
import { UNKNOWN } from "utils/text";
import {
  brukerBankkode,
  harValgtBic,
  harValgtUSA,
  validerBankkode,
  validerBic,
} from "../utils";
import AmerikanskKonto from "./AmerikanskKonto";
import LandMedBankkode from "./LandMedBankkode";
import LandUtenBankkode from "./LandUtenBankkode";
import { OptionType } from "types/option";
import { useStore } from "store/Context";
import { mapErrorsToSummary } from "utils/kontonummer";
import { Alert, Link, ErrorSummary } from "@navikt/ds-react";

interface Props {
  personident?: { verdi: string; type: string };
  utenlandskbank?: UtenlandskBankkonto;
}

interface FormFields {
  land?: OptionType;
  valuta?: OptionType;
  banknavn?: string;
  kontonummer?: string;
  bickode?: string;
  retningsnummer?: string;
  bankkode?: string;
  adresse1?: string;
  adresse2?: string;
  adresse3?: string;
}

export interface OutboundUtenlandsbankonto {
  value: string | null;
  utenlandskKontoInformasjon: {
    landkode: string;
    landkodeTobokstavs?: string;
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
export const BANKKODER: { [key: string]: string } = {
  US: "FW",
  NZ: "NZ",
  AU: "AU",
  ZA: "ZA",
  CA: "CC",
  RU: "RU",
};

const OpprettEllerEndreUtenlandsbank = (props: Props) => {
  const { formatMessage: msg } = useIntl();
  const [{ formKey }] = useStore();
  const { utenlandskbank } = props;

  /*
    Initiate form
   */
  const initialValues: FormFields = utenlandskbank
    ? {
        ...utenlandskbank,
        bickode: utenlandskbank.swiftkode,
        kontonummer: utenlandskbank.kontonummer || utenlandskbank.iban,
        land: {
          label: utenlandskbank.land.toUpperCase(),
          value: UNKNOWN,
        },
        valuta: {
          label: utenlandskbank.valuta,
          value: UNKNOWN,
        },
      }
    : {};

  /*
    Validering av kontonummer: Spesialhåndtering av amerikanske
    kontonummer. Ta kontakt med økonomiavdelingen for ytterligere informasjon.
   */
  const formConfig = {
    land: {
      isRequired: msg({ id: "validation.land.pakrevd" }),
    },
    valuta: {
      isRequired: msg({ id: "validation.valuta.pakrevd" }),
    },
    banknavn: {
      isRequired: msg({ id: "validation.banknavn.pakrevd" }),
      isFirstCharNotSpace: msg({ id: "validation.firstchar.notspace" }),
      isBlacklistedCommon: msg({ id: "validation.svarteliste.felles" }),
      hasMultipleCombinedSpaces: msg({ id: "validation.multiple.spaces" }),
      notOnlySignsDigitsSpace: msg({
        id: "validation.only.space.signs.or.digits",
      }),
      isValidBanknavn: msg({ id: "validation.banknavn.ugyldig" }),
    },
    kontonummer: {
      isIBANRequired: {
        message: msg({ id: "validation.iban.pakrevd" }),
        validateIf: ({ fields }: ValidatorContext) =>
          fields.land && fields.land.kreverIban,
      },
      isRequired: {
        message: msg({ id: "validation.kontonummer.pakrevd" }),
        validateIf: ({ fields }: ValidatorContext) =>
          fields.land && !fields.land.kreverIban,
      },
      isLettersAndDigits: msg({ id: "validation.only.letters.and.digits" }),

      isNotIBAN: {
        message: msg({ id: "validation.ikke.iban" }),
        validateIf: ({ fields }: ValidatorContext) => harValgtUSA(fields.land),
      },
      isIBAN: {
        message: msg({ id: "validation.iban.gyldig" }),
        validateIf: ({ fields }: ValidatorContext) =>
          fields.land && fields.land.kreverIban,
      },
      isIBANCountryCompliant: {
        message: msg({ id: "validation.iban.country" }),
        validateIf: ({ fields }: ValidatorContext) =>
          isValidIBAN(fields.kontonummer),
      },
      isNotYourSSN: {
        message: msg({ id: "validation.kontonummer.idnr" }),
        validateIf: ({ fields }: ValidatorContext) =>
          fields.kontonummer === props.personident?.verdi,
      },
    },
    bickode: {
      isRequired: {
        message: msg({ id: "validation.bic.pakrevd" }),
        validateIf: ({ fields }: ValidatorContext) => validerBic(fields),
      },
      isLettersAndDigits: {
        message: msg({ id: "validation.only.letters.and.digits" }),
        validateIf: ({ fields }: ValidatorContext) => validerBic(fields),
      },
      isBIC: {
        message: msg({ id: "validation.bic.gyldig" }),
        validateIf: ({ fields }: ValidatorContext) => validerBic(fields),
      },
      isBICCountryCompliant: {
        message: msg({ id: "validation.bic.country" }),
        validateIf: ({ fields }: ValidatorContext) => validerBic(fields),
      },
    },
    retningsnummer: {
      isRequired: {
        message: "*",
        validateIf: ({ fields }: ValidatorContext) => validerBankkode(fields),
      },
    },
    bankkode: {
      isRequired: {
        message: msg({ id: "validation.bankkode.pakrevd" }),
        validateIf: ({ fields }: ValidatorContext) => validerBankkode(fields),
      },
      isNumber: {
        message: msg({ id: "validation.only.digits" }),
        validateIf: ({ fields }: ValidatorContext) => validerBankkode(fields),
      },
      isBankkode: {
        message: ({ land, siffer }: { land: string; siffer: number }) =>
          msg({ id: "validation.bankkode.lengde" }, { land, siffer }),
        validateIf: ({ fields }: ValidatorContext) => validerBankkode(fields),
      },
    },
    adresse1: {
      isRequired: {
        message: msg({ id: "validation.adresse.pakrevd" }),
        validateIf: ({ fields }: ValidatorContext) =>
          validerBankkode(fields) || fields.adresse2 || fields.adresse3,
      },

      isFirstCharNotSpace: msg({ id: "validation.firstchar.notspace" }),
      isBlacklistedCommon: msg({ id: "validation.svarteliste.felles" }),
      hasMultipleCombinedSpaces: msg({ id: "validation.multiple.spaces" }),
      notOnlySignsDigitsSpace: msg({
        id: "validation.only.space.signs.or.digits",
      }),
      isValidAdresselinje: msg({ id: "validation.adresselinje.ugyldig" }),
    },
    adresse2: {
      isRequired: {
        message: msg({ id: "validation.adresselinje.pakrevd" }),
        validateIf: ({ fields }: ValidatorContext) => fields.adresse3,
      },
      isFirstCharNotSpace: msg({ id: "validation.firstchar.notspace" }),
      isBlacklistedCommon: msg({ id: "validation.svarteliste.felles" }),
      hasMultipleCombinedSpaces: msg({ id: "validation.multiple.spaces" }),
      notOnlySignsSpace: msg({ id: "validation.only.space.or.signs" }),
      isValidAdresselinje: msg({ id: "validation.adresselinje.ugyldig" }),
    },
    adresse3: {
      isFirstCharNotSpace: msg({ id: "validation.firstchar.notspace" }),
      isBlacklistedCommon: msg({ id: "validation.svarteliste.felles" }),
      hasMultipleCombinedSpaces: msg({ id: "validation.multiple.spaces" }),
      notOnlySignsSpace: msg({ id: "validation.only.space.or.signs" }),
      isValidAdresselinje: msg({ id: "validation.adresselinje.ugyldig" }),
    },
  };

  return (
    <Validation key={formKey} config={formConfig} initialValues={initialValues}>
      {({ errors, fields, submitted, setField }) => {
        const hasErrors = Object.values(errors).find((error) => error);
        return (
          <>
            <div className="utbetalinger__alert">
              <Alert variant="info">
                <FormattedMessage
                  id="felter.utenlandskkonto.info"
                  values={{
                    a: (text: String) => (
                      <Link href="/no/NAV+og+samfunn/Kontakt+NAV/Utbetalinger/Utbetalinger/utbetaling-av-ytelser-fra-nav-til-utlandet">
                        {text}
                      </Link>
                    ),
                  }}
                />
              </Alert>
            </div>
            <SelectLand
              submitted={submitted}
              option={fields.land}
              label={msg({ id: "felter.bankensland.label" })}
              error={errors.land}
              onChange={(option) => {
                const bankkodeRetningsnummer = option
                  ? BANKKODER[option.value]
                  : null;

                setField({
                  land: option,
                  ...(brukerBankkode(option) && {
                    bankidentifier: undefined,
                  }),
                  ...(bankkodeRetningsnummer && {
                    retningsnummer: bankkodeRetningsnummer,
                  }),
                });
              }}
            />
            {fields.land && (
              <>
                <SelectValuta
                  submitted={submitted}
                  option={fields.valuta}
                  label={msg({ id: "felter.valuta.label" })}
                  hjelpetekst={"utbetalinger.hjelpetekster.valuta"}
                  onChange={(value) => setField({ valuta: value })}
                  error={errors.valuta}
                />
                <InputMedHjelpetekst
                  id={"banknavn"}
                  size="medium"
                  maxLength={35}
                  htmlSize={37}
                  submitted={submitted}
                  value={fields.banknavn}
                  label={msg({ id: "felter.banknavn.label" })}
                  onChange={(value) => setField({ banknavn: value })}
                  error={errors.banknavn}
                />
                <InputMedHjelpetekst
                  id={"kontonummer"}
                  size="medium"
                  maxLength={36}
                  htmlSize={37}
                  submitted={submitted}
                  value={fields.kontonummer}
                  hjelpetekst={"utbetalinger.hjelpetekster.kontonummer"}
                  label={msg({ id: "felter.kontonummer.kontonummer.label" })}
                  onChange={(value) => setField({ kontonummer: value })}
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
            {submitted && hasErrors && fields?.land && (
              <ErrorSummary title={msg({ id: "validation.fix.errors" })}>
                {mapErrorsToSummary(errors)}
              </ErrorSummary>
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
        swift: bickode,
      }),
      bank: {
        ...(sendAdresse && {
          adresseLinje1: fields.adresse1,
          adresseLinje2: fields.adresse2,
          adresseLinje3: fields.adresse3,
        }),
        ...(sendBankkode && {
          kode: fields.bankkode,
        }),
        navn: fields.banknavn,
      },
    },
  };
};

export default OpprettEllerEndreUtenlandsbank;
