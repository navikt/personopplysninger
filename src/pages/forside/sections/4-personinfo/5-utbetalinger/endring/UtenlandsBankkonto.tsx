import React, { useState } from "react";
import { FormContext, FormValidation } from "calidation";
import { postKontonummer } from "../../../../../../clients/apiClient";
import { HTTPError } from "../../../../../../components/error/Error";
import AlertStripe, {
  AlertStripeInfo,
  AlertStripeType
} from "nav-frontend-alertstriper";
import { Knapp } from "nav-frontend-knapper";
import { FormattedMessage } from "react-intl";
import { UtenlandskBankkonto } from "../../../../../../types/personalia";
import EndreKontoFelt from "../../../../../../components/kontonummer/EndreKontoFelt";

interface Props {
  onChangeSuccess: (kontonummer: UtenlandskBankkonto) => void;
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
  const { onChangeSuccess } = props;

  const formConfig = {
    kontonummer: {
      isRequired: "Kontonummer er påkrevd"
    },
    bankkode: {
      isRequired: "Er påkrevd "
    },
    banknavn: {
      isRequired: "Er påkrevd "
    },
    land: {
      isRequired: "Er påkrevd "
    },
    swiftkode: {
      isRequired: "Er påkrevd "
    },
    valuta: {
      isRequired: "Er påkrevd "
    },
    adresse1: {
      isRequired: "Er påkrevd "
    },
    adresse2: {},
    adresse3: {}
  };

  const submitEndre = (c: FormContext) => {
    const { isValid, fields } = c;

    console.log(isValid);
    if (isValid) {
      const outbound = {
        value: fields.kontonummer,
        utenlandskKontoInformasjon: {
          bank: {
            adresseLinje1: fields.adresse1,
            adresseLinje2: fields.adresse2,
            adresseLinje3: fields.adresse3,
            kode: fields.bankkode,
            navn: fields.banknavn
          },
          landkode: fields.land,
          swift: fields.swiftkode,
          valuta: fields.valuta
        }
      };

      console.log(outbound);
      settLoading(true);
      postKontonummer(outbound)
        .then(() => {
          onChangeSuccess(fields as UtenlandskBankkonto);
        })
        .catch((error: HTTPError) => {
          settAlert({
            type: "feil",
            melding: `${error.code} - ${error.text}`
          });
        })
        .then(() => {
          settLoading(false);
        });
    }
  };

  return (
    <FormValidation onSubmit={submitEndre} config={formConfig}>
      {({ errors, fields, submitted, setField }) => {
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
                <EndreKontoFelt
                  label={"Kontonummer / IBAN"}
                  value={fields.kontonummer}
                  submitted={submitted}
                  onChange={value => setField({ kontonummer: value })}
                  error={errors.kontonummer}
                />
              </div>
              <div className="utbetalinger__input-box input--m">
                <EndreKontoFelt
                  label={"BIC / Swift kode"}
                  value={fields.swiftkode}
                  submitted={submitted}
                  onChange={value => setField({ swiftkode: value })}
                  error={errors.swiftkode}
                />
              </div>
              <div className="utbetalinger__input-box input--m">
                <EndreKontoFelt
                  label={"Bankens land"}
                  value={fields.land}
                  submitted={submitted}
                  onChange={value => setField({ land: value })}
                  error={errors.land}
                />
              </div>
              <div className="utbetalinger__input-box input--m">
                <EndreKontoFelt
                  label={"Valuta"}
                  value={fields.valuta}
                  submitted={submitted}
                  onChange={value => setField({ valuta: value })}
                  error={errors.valuta}
                />
              </div>
              <div className="utbetalinger__input-box input--m">
                <EndreKontoFelt
                  label={"Bankkode"}
                  value={fields.bankkode}
                  submitted={submitted}
                  onChange={value => setField({ bankkode: value })}
                  error={errors.bankkode}
                />
              </div>
              <div className="utbetalinger__input-box input--m">
                <EndreKontoFelt
                  label={"Bankens navn"}
                  value={fields.banknavn}
                  submitted={submitted}
                  onChange={value => setField({ banknavn: value })}
                  error={errors.banknavn}
                />
              </div>
              <div className="utbetalinger__adressefelter">
                <EndreKontoFelt
                  label={"Adresse"}
                  value={fields.adresse1}
                  submitted={submitted}
                  onChange={value => setField({ adresse1: value })}
                  error={errors.adresse1}
                />
                <EndreKontoFelt
                  label={""}
                  value={fields.adresse2}
                  submitted={submitted}
                  onChange={value => setField({ adresse2: value })}
                  error={errors.adresse2}
                />
                <EndreKontoFelt
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
