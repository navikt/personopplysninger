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

const OpprettEllerEndreUtenlandsbank = (props: Props) => {
  const [loading, settLoading] = useState(false);
  const [alert, settAlert] = useState<Alert | undefined>();
  const { onChangeSuccess, utenlandskbank } = props;
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
      isRequired: "Kontonummer / IBAN er påkrevd",
      isIBAN: "Et gyldig IBAN er påkrevd"
    },
    bankkode: {
      isRequired: "Bankkode er påkrevd"
    },
    banknavn: {
      isRequired: "Banknavn er påkrevd"
    },
    land: {
      isRequired: "Land er påkrevd"
    },
    swiftkode: {
      isRequired: "Swift / BIC kode er påkrevd",
      isBIC: "En gyldig SWIFT / BIC-kode er påkrevd"
    },
    valuta: {
      isRequired: "Valuta er påkrevd"
    },
    adresse1: {
      isRequired: "Feltet er påkrevd"
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
                Vær nøye med utfylling av bankinformasjon for utenlandsk konto
                slik at betalingen kommer frem til riktig sted. NAV er ikke
                ansvarlig for at opplysningene er riktige. Gebyrer kan påløpe.
                Les mer om krav til{" "}
                <a href="https://www.nav.no/no/NAV+og+samfunn/Kontakt+NAV/Utbetalinger/Utbetalinger/utbetaling-av-ytelser-fra-nav-til-utlandet">
                  utenlandsk kontonummer
                </a>
                .
              </AlertStripeInfo>
            </div>
            <div className="utbetalinger__input-container">
              <div className="utbetalinger__input-box input--m">
                <InputMedHjelpetekst
                  label={"Kontonummer / IBAN"}
                  hjelpetekst={"utbetalinger.hjelpetekster.iban"}
                  value={fields.iban}
                  submitted={submitted}
                  onChange={value => setField({ iban: value })}
                  error={errors.iban}
                />
              </div>
              <div className="utbetalinger__input-box input--m">
                <InputMedHjelpetekst
                  label={"Swift / BIC-kode"}
                  hjelpetekst={"utbetalinger.hjelpetekster.bic"}
                  value={fields.swiftkode}
                  submitted={submitted}
                  onChange={value => setField({ swiftkode: value })}
                  error={errors.swiftkode}
                />
              </div>
              <div className="utbetalinger__input-box input--m">
                <SelectLand
                  label={"Bankens land"}
                  hjelpetekst={"utbetalinger.hjelpetekster.land"}
                  option={fields.land}
                  submitted={submitted}
                  onChange={value => setField({ land: value })}
                  error={errors.land}
                />
              </div>
              <div className="utbetalinger__input-box input--m">
                <SelectValuta
                  label={"Valuta"}
                  hjelpetekst={"utbetalinger.hjelpetekster.valuta"}
                  option={fields.valuta}
                  submitted={submitted}
                  onChange={value => setField({ valuta: value })}
                  error={errors.valuta}
                />
              </div>
              <div className="utbetalinger__input-box input--m">
                <InputMedHjelpetekst
                  label={"Bankkode"}
                  hjelpetekst={"utbetalinger.hjelpetekster.bankkode"}
                  value={fields.bankkode}
                  submitted={submitted}
                  onChange={value => setField({ bankkode: value })}
                  error={errors.bankkode}
                />
              </div>
              <div className="utbetalinger__input-box input--m">
                <InputMedHjelpetekst
                  label={"Bankens navn"}
                  hjelpetekst={"utbetalinger.hjelpetekster.banknavn"}
                  value={fields.banknavn}
                  submitted={submitted}
                  onChange={value => setField({ banknavn: value })}
                  error={errors.banknavn}
                />
              </div>
              <div className="utbetalinger__adressefelter">
                <InputMedHjelpetekst
                  label={"Adresse"}
                  hjelpetekst={"utbetalinger.hjelpetekster.adresse"}
                  value={fields.adresse1}
                  submitted={submitted}
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

export default OpprettEllerEndreUtenlandsbank;
